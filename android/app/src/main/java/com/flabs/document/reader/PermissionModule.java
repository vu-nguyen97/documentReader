package com.flabs.document.reader;

import static android.os.Build.VERSION.SDK_INT;

import android.content.Intent;
import android.content.res.AssetManager;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.media.Image;
import android.net.Uri;
import android.os.Build;
import android.os.Environment;
import android.provider.Settings;
import android.util.Log;
import android.widget.TextView;
import android.widget.Toast;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.tom_roush.pdfbox.android.PDFBoxResourceLoader;

import java.io.BufferedInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.Future;
import java.util.concurrent.TimeUnit;

import com.tom_roush.pdfbox.pdmodel.PDDocument;
import com.tom_roush.pdfbox.pdmodel.PDDocumentCatalog;
import com.tom_roush.pdfbox.pdmodel.PDPage;
import com.tom_roush.pdfbox.pdmodel.PDPageContentStream;
import com.tom_roush.pdfbox.pdmodel.encryption.AccessPermission;
import com.tom_roush.pdfbox.pdmodel.encryption.StandardProtectionPolicy;
import com.tom_roush.pdfbox.pdmodel.font.PDFont;
import com.tom_roush.pdfbox.pdmodel.font.PDType1Font;
import com.tom_roush.pdfbox.pdmodel.graphics.image.JPEGFactory;
import com.tom_roush.pdfbox.pdmodel.graphics.image.LosslessFactory;
import com.tom_roush.pdfbox.pdmodel.graphics.image.PDImageXObject;
import com.tom_roush.pdfbox.pdmodel.interactive.form.PDAcroForm;
import com.tom_roush.pdfbox.pdmodel.interactive.form.PDCheckBox;
import com.tom_roush.pdfbox.pdmodel.interactive.form.PDComboBox;
import com.tom_roush.pdfbox.pdmodel.interactive.form.PDField;
import com.tom_roush.pdfbox.pdmodel.interactive.form.PDListBox;
import com.tom_roush.pdfbox.pdmodel.interactive.form.PDRadioButton;
import com.tom_roush.pdfbox.pdmodel.interactive.form.PDTextField;
import com.tom_roush.pdfbox.rendering.ImageType;
import com.tom_roush.pdfbox.rendering.PDFRenderer;
import com.tom_roush.pdfbox.text.PDFTextStripper;
import com.tom_roush.pdfbox.android.PDFBoxResourceLoader;

//import org.apache.poi.wp.usermodel.Paragraph;
//import org.apache.poi.xwpf.usermodel.XWPFDocument;
//import org.apache.poi.xwpf.usermodel.XWPFParagraph;
//import org.apache.poi.xwpf.usermodel.XWPFPictureData;
import org.bouncycastle.jce.provider.BouncyCastleProvider;


//import org.apache.poi.xwpf.usermodel.XWPFDocument;
//import org.apache.poi.xwpf.usermodel.XWPFPictureData;
//import com.itextpdf.text.Document;
//import com.itextpdf.text.pdf.PdfWriter;
//import com.itextpdf.text.Image;
//import com.itextpdf.text.Paragraph;
//import com.itextpdf.text.pdf.PdfPTable;

import com.documents4j.api.DocumentType;
import com.documents4j.api.IConverter;
import com.documents4j.job.LocalConverter;
import org.apache.commons.io.output.ByteArrayOutputStream;

import java.io.*;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.Future;
import java.util.concurrent.TimeUnit;

public class PermissionModule extends ReactContextBaseJavaModule {
    private static final int EXTERNAL_STORAGE_CODE = 10;
    File root;
    AssetManager assetManager;
    Bitmap pageImage;

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

    private void setup() {
        // Enable Android asset loading
        PDFBoxResourceLoader.init(getReactApplicationContext());
        // Find the root of the external storage.

        root = getReactApplicationContext().getCacheDir();
        assetManager = getReactApplicationContext().getAssets();
    }

     @ReactMethod
     public void convertToPDF(String docPath, String pdfPath, Promise promise) {
         try {
             File baseFolder = new File(docPath).getParentFile();
             File pdfFile = new File(baseFolder, "output.pdf");


             InputStream in = new FileInputStream(docPath);
//             InputStream in = new BufferedInputStream(new FileInputStream(docPath));
//             ByteArrayOutputStream bo = new ByteArrayOutputStream();

             IConverter converter = LocalConverter.builder()
                     .baseFolder(baseFolder)
                     .workerPool(20, 25, 2, TimeUnit.SECONDS)
                     .processTimeout(5, TimeUnit.SECONDS)
                     .build();

//             Future<Boolean> conversion = converter
//                     .convert(in).as(DocumentType.MS_WORD)
//                     .to(pdfFile).as(DocumentType.PDF)
//                     .prioritizeWith(1000) // optional
//                     .schedule();
//             conversion.get();

//             try (OutputStream outputStream = new FileOutputStream("D:\\output.pdf")) {
//                 bo.writeTo(outputStream);
//             } catch (IOException e) {
//                 e.printStackTrace();
//             }

             System.out.println("Chuyển đổi thành công, tệp PDF lưu tại: " + pdfFile.getAbsolutePath());
             in.close();
             Toast.makeText(getReactApplicationContext(), "Success!", Toast.LENGTH_LONG).show();
//             bo.close();

             try {
                 Future<Boolean> conversion = converter
                         .convert(in).as(DocumentType.MS_WORD)
                         .to(pdfFile).as(DocumentType.PDF)
                         .prioritizeWith(1000) // optional
                         .schedule();
                 conversion.get();

                 in.close();
                 Toast.makeText(getReactApplicationContext(), "Success!" + pdfFile.getAbsolutePath(), Toast.LENGTH_LONG).show();
             } catch (ExecutionException | InterruptedException e) {
                 // Xử lý ngoại lệ
                 e.printStackTrace();
                 Toast.makeText(getReactApplicationContext(), "Error: " + e.getMessage(), Toast.LENGTH_LONG).show();
                 promise.resolve("???????" + e.getMessage());
             }
         } catch (Exception e) {
             Toast.makeText(getReactApplicationContext(), "Failll 3", Toast.LENGTH_LONG).show();
             // Handle other exceptions
             e.printStackTrace();
         }



//         try {
//             XWPFDocument document = new XWPFDocument(new FileInputStream(wordFilePath));
//             Document pdfDocument = new Document();
//             PdfWriter.getInstance(pdfDocument, new FileOutputStream(pdfFilePath));
//             pdfDocument.open();
//
//             for (XWPFParagraph paragraph : document.getParagraphs()) {
//                 pdfDocument.add(new Paragraph(paragraph.getText()));
//             }
//
//             for (XWPFPictureData pictureData : document.getAllPictures()) {
//                 byte[] bytes = pictureData.getData();
//                 Image image = Image.getInstance(bytes);
//                 pdfDocument.add(image);
//             }
//
//             pdfDocument.close();
//         } catch (Exception e) {
//             e.printStackTrace();
//         }


//         setup();
//         PDDocument document = new PDDocument();
//         PDPage page = new PDPage();
//         document.addPage(page);
//
//         PDFont font = PDType1Font.HELVETICA;
//
//         PDPageContentStream contentStream;


//          try {
//              // Define a content stream for adding to the PDF
//              contentStream = new PDPageContentStream(document, page);

//              // Write Hello World in blue text
//              contentStream.beginText();
//              contentStream.setNonStrokingColor(15, 38, 192);
//              contentStream.setFont(font, 12);
//              contentStream.newLineAtOffset(100, 700);
//              contentStream.showText("Hello World");
//              contentStream.endText();

//              // Load in the images
// //             InputStream in = assetManager.open("falcon.jpg");
// //             InputStream alpha = assetManager.open("trans.png");

//              // Draw a green rectangle
// //             contentStream.addRect(5, 500, 100, 100);
// //             contentStream.setNonStrokingColor(0, 255, 125);
// //             contentStream.fill();

//              // Draw the falcon base image
// //             PDImageXObject ximage = JPEGFactory.createFromStream(document, in);
// //             contentStream.drawImage(ximage, 20, 20);

//              // Draw the red overlay image
// //             Bitmap alphaImage = BitmapFactory.decodeStream(alpha);
// //             PDImageXObject alphaXimage = LosslessFactory.createFromImage(document, alphaImage);
// //             contentStream.drawImage(alphaXimage, 20, 20 );

//              // Make sure that the content stream is closed:
//              contentStream.close();

//              // Save the final pdf document to a file
// //             String path = root.getAbsolutePath() + "/Created.pdf";
//              String path = "/storage/emulated/0/Download/ConvertedTest.pdf";

//              document.save(path);
//              document.close();

//              Toast.makeText(getReactApplicationContext(), "Success: path" + path, Toast.LENGTH_LONG).show();
//              promise.resolve(path);
//          } catch (IOException e) {
//              Log.e("PdfBox-Android-Sample", "Exception thrown while creating PDF", e);
//              Toast.makeText(getReactApplicationContext(), "Faiiiiilllll", Toast.LENGTH_LONG).show();
//          }


//         try {
//             PDDocument document = new PDDocument();
//             PDPage page = new PDPage();
//             document.addPage(page);
//
//             PDPageContentStream contentStream = new PDPageContentStream(document, page);
//
//             contentStream.setFont(PDType1Font.COURIER, 12);
//             contentStream.beginText();
//             contentStream.showText("Hello World");
//             contentStream.endText();
//             contentStream.close();
//
//             document.save("pdfBoxHelloWorld.pdf");
//             document.close();
//         } catch (IOException e) {
//             e.printStackTrace();
//         }
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