package com.flabs.document.reader;

import static android.os.Build.VERSION.SDK_INT;

import android.content.Context;
import android.content.Intent;
import android.net.Uri;
import android.os.Build;
import android.os.Environment;
import android.provider.Settings;
import android.util.Log;
import android.widget.Toast;

import com.facebook.flipper.plugins.databases.ObjectMapper;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellType;
import org.apache.poi.ss.usermodel.DateUtil;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.util.WorkbookUtil;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xwpf.usermodel.XWPFDocument;
import org.apache.poi.xwpf.usermodel.XWPFParagraph;
import org.apache.poi.xwpf.usermodel.XWPFRun;
import org.apache.poi.xwpf.usermodel.XWPFStyle;
import org.openxmlformats.schemas.wordprocessingml.x2006.main.CTShd;

public class PermissionModule extends ReactContextBaseJavaModule {
    private static final int EXTERNAL_STORAGE_CODE = 10;

    @Override
    public String getName() {
        return "PermissionModule";
    }

    public PermissionModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public Map<String, Object> getConstants() {
        final Map<String, Object> constants = new HashMap<>();
        constants.put("packageName", getReactApplicationContext().getPackageName());
        return constants;
    }

    @ReactMethod
    public void requestPermission(Promise promise) {
        if (SDK_INT >= Build.VERSION_CODES.R) {
            Uri uri = Uri.parse("package:" + getReactApplicationContext().getPackageName());
            Intent intent = new Intent();
            intent.setAction(Settings.ACTION_MANAGE_APP_ALL_FILES_ACCESS_PERMISSION);
            intent.setData(uri);
            intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);

            getReactApplicationContext().startActivity(intent);
        } else {
            // below android 11
            Toast.makeText(getReactApplicationContext(), "Android version " + SDK_INT + " is not supported yet.", Toast.LENGTH_LONG).show();
        }
    }

    @ReactMethod
    public void getPermission(Promise promise) {
         promise.resolve(SDK_INT >= Build.VERSION_CODES.R && Environment.isExternalStorageManager());
    }

    private static final String TAG = PermissionModule.class.getSimpleName();

    @ReactMethod
    public void readExcelNew(String filePath, Promise promise) {
        List<Map<Integer, Object>> list = null;
        Workbook wb;
        if (filePath == null) {
            list = null;
        }
        String extString;
        if (!filePath.endsWith(".xls") && !filePath.endsWith(".xlsx")) {
            Log.e(TAG, "Please select the correct Excel file");
            list = null;
        }
        extString = filePath.substring(filePath.lastIndexOf("."));
        InputStream is;
        try {
            is = getReactApplicationContext().getContentResolver().openInputStream(Uri.parse("file://" + filePath));
            Log.i(TAG, "readExcel: " + extString);
            if (".xls".equals(extString)) {
                wb = new HSSFWorkbook(is);
            } else if (".xlsx".equals(extString)) {
                wb = new XSSFWorkbook(is);
            } else {
                wb = null;
            }
            if (wb != null) {
                // used to store data
                list = new ArrayList<>();
                // get the first sheet
                Sheet sheet = wb.getSheetAt(0);
                // get the first line header
                Row rowHeader = sheet.getRow(0);
                int cellsCount = rowHeader.getPhysicalNumberOfCells();

                //store header to the map
                Map<Integer, Object> headerMap = new HashMap<>();
//                Map<Integer, String> headerMap = new HashMap<>();
                for (int c = 0; c < cellsCount; c++) {
                    Object value = getCellFormatValue(rowHeader.getCell(c));
                    String cellInfo = "header " + "; c:" + c + "; v:" + value;
//                    String cellInfo = "header " + "; c:" + c + "; v:" + "";
                    System.out.println("cellInfo: " + cellInfo);
                    Log.i(TAG, "readExcelNew: " + "22222");
//                    headerMap.put(c, "");
                    headerMap.put(c, value);
                }
//                ObjectMapper
//                promise.resolve(headerMap.toString());

                //add  headermap to list
                list.add(headerMap);

//                // get the maximum number of rows
                int rownum = sheet.getPhysicalNumberOfRows();
                // get the maximum number of columns
                int colnum = headerMap.size();
                //index starts from 1,exclude header.
                //if you want read line by line, index should from 0.
                for (int i = 1; i < rownum; i++) {
                    Row row = sheet.getRow(i);
                    //storing subcontent
                    Map<Integer, Object> itemMap = new HashMap<>();
                    if (row != null) {
                        for (int j = 0; j < colnum; j++) {
                            Object value = getCellFormatValue(row.getCell(j));
                            String cellInfo = "r: " + i + "; c:" + j + "; v:" + value;
                            Log.i(TAG, "readExcelNew: " + cellInfo);
                            itemMap.put(j, value);
                        }
                    } else {
                        break;
                    }
                    list.add(itemMap);
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
            Log.e(TAG, "readExcelNew: import error " + e);
            Toast.makeText(getReactApplicationContext(), "import error " + e, Toast.LENGTH_SHORT).show();
            promise.resolve(e.getMessage());
        }
        promise.resolve(list.toString());
    }

    private static Object getCellFormatValue(Cell cell) {
        Object cellValue;
        if (cell != null) {
            switch (cell.getCellType()) {
                case BOOLEAN:
                    cellValue = cell.getBooleanCellValue();
                    break;
                case NUMERIC:
                    cellValue = String.valueOf(cell.getNumericCellValue());
                    break;

                case FORMULA: {
                    // determine if the cell is in date format
                    if (DateUtil.isCellDateFormatted(cell)) {
                        // Convert to date format YYYY-mm-dd
                        cellValue = cell.getDateCellValue();
                    } else {
                        // Numeric
                        cellValue = String.valueOf(cell.getNumericCellValue());
                    }
                    break;
                }
                case STRING: {
                    cellValue = cell.getRichStringCellValue().getString();
                    break;
                }
                default:
                    cellValue = "";
            }
        } else {
            cellValue = "";
        }
        return cellValue;
    }


    @ReactMethod
    public void viewFile(String path, Promise promise) {
//        webview.LoadUrl(XUI.FileUri(DirPath, FileName));
        List<StyleInfo> styleInfoList = new ArrayList<>();

        try (FileInputStream fis = new FileInputStream(new File(path));
             XWPFDocument document = new XWPFDocument(fis)) {
            int paragraphIndex = 0;

            // Lặp qua tất cả các đoạn văn bản trong tài liệu
            for (XWPFParagraph paragraph : document.getParagraphs()) {
                boolean paragraphIsBold = false;
                boolean paragraphIsItalic = false;

                // Lặp qua các run trong đoạn văn bản
                for (XWPFRun run : paragraph.getRuns()) {
                    paragraphIsBold = paragraphIsBold || run.isBold();
                    paragraphIsItalic = paragraphIsItalic || run.isItalic();
                }
                ++paragraphIndex;

                // Lưu thông tin kiểu vào danh sách
                StyleInfo styleInfo = new StyleInfo(paragraphIsBold, paragraphIsItalic, paragraphIndex);
                styleInfoList.add(styleInfo);
            }
            promise.resolve(Arguments.fromList(styleInfoList));
//            promise.resolve(styleInfoList.toString());
        } catch (IOException e) {
            e.printStackTrace();
            promise.resolve(e.getMessage());
        }

    }

    public static class StyleInfo {
        private boolean isBold;
        private boolean isItalic;
        private Integer index;

        public StyleInfo(boolean isBold, boolean isItalic, Integer index) {
            this.isBold = isBold;
            this.isItalic = isItalic;
            this.index = index;
        }

        public boolean isBold() {
            return isBold;
        }

        public boolean isItalic() {
            return isItalic;
        }

        public Integer getIndex() {
            return index;
        }

        @Override
        public String toString() {
            return  "isBold:" + isBold +
                    ", isItalic:" + isItalic +
                    ", index:" + getIndex();
        }
    }
}