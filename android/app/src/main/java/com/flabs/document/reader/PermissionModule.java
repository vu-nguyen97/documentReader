package com.flabs.document.reader;

import static android.os.Build.VERSION.SDK_INT;

import android.content.Intent;
import android.net.Uri;
import android.os.Build;
import android.os.Environment;
import android.provider.Settings;
import android.widget.Toast;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.PDPage;
import org.apache.pdfbox.pdmodel.PDPageContentStream;
import org.apache.pdfbox.pdmodel.common.PDRectangle;
import org.apache.pdfbox.pdmodel.font.PDType1Font;
import org.apache.poi.xwpf.usermodel.XWPFDocument;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.HashMap;
import java.util.Map;

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
    public void convertDocToPdf() {
        Toast.makeText(getReactApplicationContext(), "Test convert file", Toast.LENGTH_LONG).show();
    }

     @ReactMethod
     public void convertToPDF(String docPath, String pdfPath) {
         try {
             // Load the Word document
             FileInputStream docInputStream = new FileInputStream(new File(docPath));
             XWPFDocument document = new XWPFDocument(docInputStream);

             // Create a PDF document
             PDDocument pdfDocument = new PDDocument();
             PDPage page = new PDPage(PDRectangle.A4);
             pdfDocument.addPage(page);

             // Create a content stream for the PDF
             PDPageContentStream contentStream = new PDPageContentStream(pdfDocument, page);

             // Iterate through the paragraphs in the Word document and add them to the PDF
             for (var paragraph : document.getParagraphs()) {
                 contentStream.setFont(PDType1Font.HELVETICA_BOLD, 12); // Customize font and size
                 contentStream.beginText();
                 contentStream.newLineAtOffset(50, 700); // Adjust X and Y coordinates
                 contentStream.showText(paragraph.getText());
                 contentStream.endText();
             }

             contentStream.close();

             // Save the PDF to a file
             pdfDocument.save("convertedOutput.pdf");

             // Close the document streams
             pdfDocument.close();
             docInputStream.close();
         } catch (IOException e) {
             e.printStackTrace();
         }
     }

//    @ReactMethod
//    public void ConvertToPDF(String docPath, String pdfPath) {
//        try {
//            InputStream doc = new FileInputStream(new File(docPath));
//            XWPFDocument document = new XWPFDocument(doc);
//            PdfOptions options = PdfOptions.create();
//            OutputStream out = new FileOutputStream(new File(pdfPath));
//            PdfConverter.getInstance().convert(getReactApplicationContext(), "", document, out, options);
//        } catch (IOException ex) {
//            System.out.println(ex.getMessage());
//        }
//    }

    @ReactMethod
    public void getPermission(Promise promise) {
         promise.resolve(SDK_INT >= Build.VERSION_CODES.R && Environment.isExternalStorageManager());
    }
}