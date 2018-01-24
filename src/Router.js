import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
// import PropTypes from 'prop-types';
import {
  StackNavigator,
  DrawerNavigator,
  TabNavigator,
  addNavigationHelpers
} from 'react-navigation';
import { Image, StyleSheet } from 'react-native';
import SplashScreen from './components/screens/SplashScreen';
import LoginScreen from './components/screens/LoginScreen';
import PinScreen from './components/screens/PinScreen';
import HomeScreen from './components/screens/HomeScreen';
import JobScreen from './components/screens/JobScreen';
import JobInfoScreen from './components/screens/JobInfoScreen';
import ProfileScreen from './components/screens/ProfileScreen';
import NotificationScreen from './components/screens/NotificationScreen';
import LibraryScreen from './components/screens/LibraryScreen';
import AudioScreen from './components/screens/AudioScreen';
import ViewLibraryFile from './components/screens/ViewLibraryFile';
import LibraryPictureScreen from './components/screens/LibraryPictureScreen';
import LibraryVideoScreen from './components/screens/LibraryVideoScreen';
import LibraryAudioScreen from './components/screens/LibraryAudioScreen';
import HRScreen from './components/screens/HRScreen';
import ViewCompliance from './components/screens/ViewCompliance';
import NotesScreen from './components/screens/NotesScreen';
import AddNotesScreen from './components/screens/AddNotesScreen';
import ViewNoteScreen from './components/screens/ViewNoteScreen';
import MessagesScreen from './components/screens/MessagesScreen';
import InboxScreen from './components/screens/InboxScreen';
import InboxFormScreen from './components/screens/InboxFormScreen';
import ViewMessageScreen from './components/screens/ViewMessageScreen';
import ViewFileScreen from './components/screens/ViewFileScreen';
import SentScreen from './components/screens/SentScreen';
import ViewSentMessageScreen from './components/screens/ViewSentMessageScreen';
import ManagerMessagesScreen from './components/screens/ManagerMessagesScreen';
import FormScreen from './components/screens/FormScreen';
import MediaFormScreen from './components/screens/MediaFormScreen';
import HRMessagesScreen from './components/screens/HRMessagesScreen';
import SafetyMessagesScreen from './components/screens/SafetyMessagesScreen';
import ExecutiveMessagesScreen from './components/screens/ExecutiveMessagesScreen';
import CustomDrawer from './components/CustomDrawer';
// import HideNavItem from './components/HideNavItem';
import * as colors from './constants/colors';
// import * as AuthActions from './actions/AuthActions';
import * as strings from './constants/strings';
import * as routeNames from './constants/routeNames';

const styles = StyleSheet.create({
  icon: {
    maxHeight: 20,
    resizeMode: 'contain',
  }
});
//
// const AuthStack = StackNavigator({
//   Main: { screen: LoginScreen },
// }, {
//   initialRouteName: 'Main',
// });

const JobStack = StackNavigator({
  // Home: { screen: HomeScreen },
  [routeNames.job.main]: {
    screen: JobScreen,
    navigationOptions: {
      title: strings.screen.job
    }
  },
  [routeNames.job.view]: {
    screen: JobInfoScreen,
  }
}, {
  headerMode: 'none',
  initialRouteName: routeNames.job.main,
});

const ProfileStack = StackNavigator({
  [routeNames.profile.main]: {
    screen: ProfileScreen,
    navigationOptions: {
      title: strings.screen.profile
    }
  },
}, {
  headerMode: 'none',
  initialRouteName: routeNames.profile.main,
});

const LibraryStack = TabNavigator({
  [routeNames.library.main]: {
    screen: LibraryScreen,
    navigationOptions: {
      title: strings.screen.library,
      tabBarIcon: ({ tintColor }) => (
        <Image
          source={require('./images/text.png')}
          style={[styles.icon, { tintColor }]}
        />
      ),
    },
  },
  [routeNames.library.picture]: {
    screen: LibraryPictureScreen,
    navigationOptions: {
      title: strings.screen.library,
      tabBarIcon: ({ tintColor }) => (
        <Image
          source={require('./images/imagetab.png')}
          style={[styles.icon, { tintColor }]}
        />
      ),
    }
  },
  [routeNames.library.video]: {
    screen: LibraryVideoScreen,
    navigationOptions: {
      title: strings.screen.library,
      tabBarIcon: ({ tintColor }) => (
        <Image
          source={require('./images/video.png')}
          style={[styles.icon, { tintColor }]}
        />
      ),
    }
  },
  [routeNames.library.audio]: {
    screen: LibraryAudioScreen,
    navigationOptions: {
      title: strings.screen.library,
      tabBarIcon: ({ tintColor }) => (
        <Image
          source={require('./images/audio.png')}
          style={[styles.icon, { tintColor }]}
        />
      ),
    }
  },
}, {
  headerMode: 'none',
  tabBarPosition: 'bottom',
  animationEnabled: true,
  initialRouteName: routeNames.library.main,
  tabBarOptions: {
    style: {
      backgroundColor: colors.white,
      borderColor: 'transparent',
    },
    tabStyle: {
      borderColor: 'transparent',
    },
    activeTintColor: colors.blueDark,
    inactiveTintColor: colors.gray,
    showLabel: false,
    showIcon: true,
  },
});

const HRStack = StackNavigator({
  [routeNames.compliance.main]: {
    screen: HRScreen,
    navigationOptions: {
      title: strings.screen.hrFiles
    }
  },
  [routeNames.compliance.view]: {
    screen: ViewCompliance,
  }
}, {
  headerMode: 'none',
  initialRouteName: routeNames.compliance.main,
});

const NotesStack = StackNavigator({
  [routeNames.notes.main]: {
    screen: NotesScreen,
    navigationOptions: {
      title: strings.screen.notes
    }
  },
  [routeNames.notes.add]: {
    screen: AddNotesScreen,
    navigationOptions: {
      title: strings.screen.notes
    }
  },
  [routeNames.notes.view]: {
    screen: ViewNoteScreen,
    navigationOptions: {
      title: strings.screen.notes
    }
  },
}, {
  headerMode: 'none',
  initialRouteName: routeNames.notes.main,
});

const DirectMessagesStack = StackNavigator({
  [routeNames.direct.main]: {
    screen: MessagesScreen,
    navigationOptions: {
      tabBarVisible: false,
    }
  },
  [routeNames.direct.manager]: {
    screen: ManagerMessagesScreen,
    navigationOptions: {
      tabBarVisible: false,
    }
  },
  [routeNames.direct.compliance]: {
    screen: HRMessagesScreen,
    navigationOptions: {
      tabBarVisible: false,
    }
  },
  [routeNames.direct.safety]: {
    screen: SafetyMessagesScreen,
    navigationOptions: {
      tabBarVisible: false,
    }
  },
  [routeNames.direct.executive]: {
    screen: ExecutiveMessagesScreen,
    navigationOptions: {
      tabBarVisible: false,
    }
  },
  [routeNames.direct.picture]: {
    screen: MediaFormScreen,
    navigationOptions: {
      tabBarVisible: false,
    }
  },
  [routeNames.direct.video]: {
    screen: MediaFormScreen,
    navigationOptions: {
      tabBarVisible: false,
    }
  },
  [routeNames.direct.form]: {
    screen: FormScreen,
    navigationOptions: {
      tabBarVisible: false,
    }
  }
}, {
  headerMode: 'none',
  initialRouteName: routeNames.direct.main,
});

const InboxStack = StackNavigator({
  [routeNames.inbox.main]: {
    screen: InboxScreen,
    navigationOptions: {
      tabBarVisible: false,
    }
  },
  [routeNames.inbox.view]: {
    screen: ViewMessageScreen,
    navigationOptions: {
      tabBarVisible: false,
    }
  },
  [routeNames.inbox.reply]: {
    screen: InboxFormScreen,
    navigationOptions: {
      tabBarVisible: false,
    }
  },
  [routeNames.inbox.file]: {
    screen: ViewFileScreen,
    navigationOptions: {
      tabBarVisible: false,
    }
  }
}, {
  headerMode: 'none',
  initialRouteName: routeNames.inbox.main,
});
const SentStack = StackNavigator({
  [routeNames.sent.main]: {
    screen: SentScreen,
    navigationOptions: {
      tabBarVisible: false,
    }
  },
  [routeNames.sent.view]: {
    screen: ViewSentMessageScreen,
    navigationOptions: {
      tabBarVisible: false,
    }
  },
}, {
  headerMode: 'none',
  initialRouteName: routeNames.sent.main,
});

const MessagesStack = TabNavigator({
  [routeNames.messages.direct]: {
    screen: DirectMessagesStack,
    navigationOptions: {
      title: strings.messagesScreen.directTab,
    }
  },
  [routeNames.messages.inbox]: {
    screen: InboxStack,
    navigationOptions: {
      title: strings.messagesScreen.inboxTab
    }
  },
  [routeNames.messages.sent]: {
    screen: SentStack,
    navigationOptions: {
      title: strings.messagesScreen.sentTab
    }
  },
}, {
  headerMode: 'none',
  tabBarPosition: 'top',
  animationEnabled: true,
  initialRouteName: routeNames.messages.direct,
  tabBarOptions: {
    style: {
      backgroundColor: colors.blue,
      elevation: 0
    },
    tabStyle: {
      borderColor: 'transparent',
    },
    activeTintColor: colors.white,
    inactiveTintColor: colors.gray,
    showLabel: true,
    showIcon: false,
  },
});


const MainStack = StackNavigator({
  [routeNames.dash.home]: {
    screen: HomeScreen,
    navigationOptions: {
      headerTintColor: colors.blueDark,
      drawer: {
        label: 'Home',
      }
    }
  },
  [routeNames.dash.job]: {
    screen: JobStack,
    navigationOptions: {
      headerTintColor: colors.blueDark,
    }
  },
  [routeNames.dash.profile]: {
    screen: ProfileStack,
    navigationOptions: {
      headerTintColor: colors.blueDark,
    }
  },
  [routeNames.dash.library]: {
    screen: LibraryStack,
    navigationOptions: {
      headerTintColor: colors.blueDark,
    }
  },
  [routeNames.dash.compliance]: {
    screen: HRStack,
    navigationOptions: {
      headerTintColor: colors.blueDark,
    }
  },
  [routeNames.dash.notes]: {
    screen: NotesStack,
    navigationOptions: {
      headerTintColor: colors.blueDark,
    }
  },
  [routeNames.dash.messages]: {
    screen: MessagesStack,
    navigationOptions: {
      headerTintColor: colors.blueDark,
    }
  },
  [routeNames.dash.audio]: {
    screen: AudioScreen,
    navigationOptions: {
      headerTintColor: colors.blueDark,
      title: strings.screen.audio,
      tabBarVisible: false,
    },
  },
  [routeNames.dash.notifications]: {
    screen: NotificationScreen,
    navigationOptions: {
      headerTintColor: colors.blueDark,
      title: strings.screen.notifications,
      tabBarVisible: false,
    },
  },
  [routeNames.dash.viewFile]: {
    screen: ViewLibraryFile,
    navigationOptions: {
      headerTintColor: colors.blueDark,
      title: strings.screen.viewLibrary,
      tabBarVisible: false,
    },
  }
}, {
  contentComponent: CustomDrawer,
  contentOptions: {
    inactiveTintColor: colors.white,
    activeTintColor: colors.white,
  },
  initialRouteName: routeNames.dash.home,
  }
);

const DrawerStack = DrawerNavigator({
  [routeNames.dash.dashboard]: {
    screen: MainStack,
    drawer: {
      label: 'Home',
    }
  },
  [routeNames.drawer.profile]: {
    screen: ProfileStack,
    navigationOptions: {
      drawer: {
        label: 'Setting',
      }
    }
  },
  [routeNames.drawer.help]: {
    screen: MainStack,
    navigationOptions: {
      drawer: {
        label: 'Help',
      }
    }
  },
  [routeNames.drawer.privacy]: {
    screen: MainStack,
    navigationOptions: {
      drawer: {
        label: 'Privacy Policy',
      }
    }
  },
}, {
  contentComponent: CustomDrawer,
  contentOptions: {
    inactiveTintColor: colors.white,
    activeTintColor: colors.white,
  },
  headerMode: 'none',
  initialRouteName: routeNames.dash.dashboard,
}
);

export const RootStack = StackNavigator({
  [routeNames.root.splash]: { screen: SplashScreen },
  [routeNames.root.login]: { screen: LoginScreen },
  [routeNames.root.pin]: {
    screen: PinScreen,
    navigationOptions: {
      drawer: {
        label: 'Enter Pin',
      }
    }
  },
  [routeNames.root.drawer]: {
    screen: DrawerStack,
  },
}, {
  headerMode: 'none',
  initialRouteName: routeNames.root.splash,
});

const AppWithNavigationState = ({ dispatch, nav }) => (
  <RootStack
    navigation={addNavigationHelpers({
      dispatch,
      state: nav,
   })}
  />
);

const mapStateToProps = state => ({
  nav: state.nav
});

export default connect(mapStateToProps)(AppWithNavigationState);
