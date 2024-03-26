# Run project

## Step 1: Front end: use Node version 18.17.1

Nên dùng nvm để dễ switch version node.
Note: Nhớ xóa node cũ ở trên máy trước khi cài nvm.

Refs cài nvm cho window: https://github.com/coreybutler/nvm-windows

Clone project và chạy lệnh dưới để cài các dependencies của FE:

```bash
yarn install
```

## Step 2: Setup and build thư mục android

- Setup: Cài thêm biến môi trường ở "System variables":

* Thêm ANDROID_HOME : C:\Users\[COMPUTER_NAME]\AppData\Local\Android\Sdk
* Thêm: JAVA_HOME: C:\Program Files\Java\jdk-11 (version không bắt buộc là 11)
* Sửa Path: thêm: %JAVA_HOME%\bin

- Build
  Mở thư mục con documentReader/android bằng 1 trong 2 IDE bên dưới. (Recommend: Android Studio)
  Hiện đã chạy lại thành công trên Android Studio với JDK 17.0.7.
  Cần setup IDE với verion JDK chuẩn để chạy project.
  Đang dùng với gradle version 8.1.

### Step 2.1: Android Studio

Version: Android Studio Hedgehog | 2023.1.1 Patch 2.
File -> Settings -> Tab "Build, Execution, Deployment" -> Tab "Build Tools" -> Tab "Gradle" -> Gradle JDK 17.0.7.

### Step 2.2: Intellij Idea

Đã thử với version IntelliJ IDEA 2022.1.4 (Community Edition) nhưng build vẫn có lỗi.

- File -> Settings -> Tab "Build, Execution, Deployment" -> Tab "Build Tools" -> Tab "Gradle" -> Gradle JDK.
- File -> Project Structure -> trong các Tab "Project", "Modules" -> Select SDK (Android Studio menu không thấy có phần select SDK này).

## Step 3: Run app

Thêm máy ảo trên Android Studio (phần Device Manager) và chạy nó.
Có thể kiểm tra để chắc chắn project đã phát hiện có máy đang được giả lập (kết nối).

```bash
adb devices
```

Cuối cùng chạy project

```bash
yarn run android
```

# Build apk file:

## Refs:

https://reactnative.dev/docs/signed-apk-android
https://stackoverflow.com/questions/35935060/how-can-i-generate-an-apk-that-can-run-without-server-with-react-native

## Build step:

- B1: cd với quyền admin vào đường dẫn như: C:\Program Files\Java\jdk-11\bin (dùng với jdk bất kỳ)
- B2: Nhập lệnh như link Refs để tạo ra file: my-upload-key.keystore
- B3: Copy file my-upload-key.keystore đã tạo ở đường dẫn b1 vào android/app
- B4: Update password dùng khi tạo keystore vào file android/gradle.properties.
  Password này là quan trọng nhưng hiện tại vẫn đẻ public ở đường dẫn trên vì project vẫn chưa lên production.
- B5: mở terminal -> cd android -> Chạy "./gradlew assembleRelease" (clean build cũ dùng ./gradlew clean. Có IDE có thể bỏ "./")

```bash
# build
./gradlew assembleRelease
# clean old build
./gradlew clean
```

# Một vài lỗi hay gặp:

- Lỗi Intellij Idea use version 2021.2.1 or newer: do gradle version không tương thích -> sửa distributionUrl ở gradle-wrapper.properties.Hiện đang chạy với gradle 8.1, version ban đầu là 8.0.1 nhưng build thư mục android fail.
- Khi IDE tự build (hoặc rebuild) code BE của app lỗi, có thể cần xóa cache: xóa android/.gradle và android/.idea thư mục.
- Build lại FE: xóa node_modules thư mục, yarn.lock file và "yarn install" lại.

### =======

## ==============

# Default README.md file

## ==============

### =======

This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# Getting Started

> **Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

## Step 1: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

### For iOS

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.

## Step 3: Modifying your App

Now that you have successfully run the app, let's modify it.

1. Open `App.tsx` in your text editor of choice and edit some lines.
2. For **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Developer Menu** (<kbd>Ctrl</kbd> + <kbd>M</kbd> (on Window and Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (on macOS)) to see your changes!

   For **iOS**: Hit <kbd>Cmd ⌘</kbd> + <kbd>R</kbd> in your iOS Simulator to reload the app and see your changes!

## Congratulations! :tada:

You've successfully run and modified your React Native App. :partying_face:

### Now what?

- If you want to add this new React Native code to an existing application, check out the [Integration guide](https://reactnative.dev/docs/integration-with-existing-apps).
- If you're curious to learn more about React Native, check out the [Introduction to React Native](https://reactnative.dev/docs/getting-started).

# Troubleshooting

If you can't get this to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

# Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.
