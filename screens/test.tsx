import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {CastButton, useRemoteMediaClient} from 'react-native-google-cast';
import Video from 'react-native-video';

export function CastComponent() {
  // This will automatically rerender when client is connected to a device
  // (after pressing the button that's rendered below)
  const client = useRemoteMediaClient();

  useEffect(() => {
    console.log('client :>> ', client);
  }, [client]);

  if (client) {
    // Send the media to your Cast device as soon as we connect to a device
    // (though you'll probably want to call this later once user clicks on a video or something)
    client.loadMedia({
      mediaInfo: {
        contentUrl:
          'https://commondatastorage.googleapis.com/gtv-videos-bucket/CastVideos/mp4/BigBuckBunny.mp4',
        contentType: 'video/mp4',
      },
    });
  }

  // This will render native Cast button.
  // When a user presses it, a Cast dialog will prompt them to select a Cast device to connect to.
  return (
    <View>
      <CastButton
        style={{
          width: 24,
          height: 24,
          tintColor: 'black',
          marginTop: 10,
          paddingHorizontal: 36,
        }}
      />
      <View style={styles.container}>
        <Video
          source={{
            uri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
          }} // Thay đổi URL của video tại đây
          controls={true}
          resizeMode="cover"
          // resizeMode="contain" // Chế độ tỷ lệ khung hình
          // hideShutterView={true}
          style={styles.video}
          // onEnd={() => {}}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  video: {
    width: 300,
    height: 200,
  },
});
