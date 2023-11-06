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
    public void getPermission(Promise promise) {
         promise.resolve(SDK_INT >= Build.VERSION_CODES.R && Environment.isExternalStorageManager());
    }
}