import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { StackNavigator, DrawerNavigator, TabNavigator } from 'react-navigation';
import { Image, StyleSheet } from 'react-native';
import SplashScreen from './components/screens/SplashScreen';
import LoginScreen from './components/screens/LoginScreen';
import HomeScreen from './components/screens/HomeScreen';
import JobScreen from './components/screens/JobScreen';
import JobInfoScreen from './components/screens/JobInfoScreen';
import ProfileScreen from './components/screens/ProfileScreen';
import LibraryScreen from './components/screens/LibraryScreen';
import LibraryPictureScreen from './components/screens/LibraryPictureScreen';
import LibraryVideoScreen from './components/screens/LibraryVideoScreen';
import LibraryAudioScreen from './components/screens/LibraryAudioScreen';
import HRScreen from './components/screens/HRScreen';
import NotesScreen from './components/screens/NotesScreen';
import AddNotesScreen from './components/screens/AddNotesScreen';
import MessagesScreen from './components/screens/MessagesScreen';
import ManagerMessagesScreen from './components/screens/ManagerMessagesScreen';
import ManagerFormScreen from './components/screens/ManagerFormScreen';
import MediaFormScreen from './components/screens/MediaFormScreen';
import HRMessagesScreen from './components/screens/HRMessagesScreen';
import SafetyMessagesScreen from './components/screens/SafetyMessagesScreen';
import ExecutiveMessagesScreen from './components/screens/ExecutiveMessagesScreen';
import PictureMessagesScreen from './components/screens/PictureMessagesScreen';
import VideoMessagesScreen from './components/screens/VideoMessagesScreen';
import SettingScreen from './components/screens/SettingScreen';
import CustomDrawer from './components/CustomDrawer';
import HideNavItem from './components/HideNavItem';
import * as colors from './constants/colors';
import * as AuthActions from './actions/AuthActions';
import * as strings from './constants/strings';

const styles = StyleSheet.create({
  icon: {
    maxHeight: 20,
    resizeMode: 'contain',
  }
});

const AuthStack = StackNavigator({
  Main: { screen: LoginScreen },
}, {
  initialRouteName: 'Main',
});

const SettingStack = StackNavigator({
  Main: {
    screen: SettingScreen,
    navigationOptions: {
      title: strings.screen.setting
    }
  },
}, {
  headerMode: 'none',
  initialRouteName: 'Main',
});

const JobStack = StackNavigator({
  // Home: { screen: HomeScreen },
  Main: {
    screen: JobScreen,
    navigationOptions: {
      title: strings.screen.job
    }
  },
  ViewInfo: {
    screen: JobInfoScreen,
  }
}, {
  headerMode: 'none',
  initialRouteName: 'Main',
});

const ProfileStack = StackNavigator({
  Main: {
    screen: ProfileScreen,
    navigationOptions: {
      title: strings.screen.profile
    }
  },
}, {
  headerMode: 'none',
  initialRouteName: 'Main',
});

const LibraryStack = TabNavigator({
  Main: {
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
  Pictures: {
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
  Videos: {
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
  Audios: {
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
  initialRouteName: 'Main',
  tabBarOptions: {
    style: {
      backgroundColor: colors.white,
      borderColor: 'transparent',
    },
    tabStyle: {
      borderColor: 'transparent',
    },
    activeTintColor: colors.blue,
    inactiveTintColor: colors.gray,
    showLabel: false,
    showIcon: true,
  },
});

const HRStack = StackNavigator({
  Main: {
    screen: HRScreen,
    navigationOptions: {
      title: strings.screen.hrFiles
    }
  },
}, {
  headerMode: 'none',
  initialRouteName: 'Main',
});

const NotesStack = StackNavigator({
  Main: {
    screen: NotesScreen,
    navigationOptions: {
      title: strings.screen.notes
    }
  },
  Add: {
    screen: AddNotesScreen,
    navigationOptions: {
      title: strings.screen.notes
    }
  },
}, {
  headerMode: 'none',
  initialRouteName: 'Main',
});

const ManagerStack = StackNavigator({
  Main: {
    screen: ManagerMessagesScreen,
  },
  Form: {
    screen: ManagerFormScreen,
  }
}, {
  headerMode: 'None',
  initialRouteName: 'Main',
});

const DirectMessagesStack = StackNavigator({
  Main: {
    screen: MessagesScreen,
  },
  Manager: {
    screen: ManagerMessagesScreen,
    navigationOptions: {
      tabBarVisible: false,
    }
  },
  Hr: {
    screen: HRMessagesScreen,
    navigationOptions: {
      tabBarVisible: false,
    }
  },
  Safety: {
    screen: SafetyMessagesScreen,
    navigationOptions: {
      tabBarVisible: false,
    }
  },
  Executive: {
    screen: ExecutiveMessagesScreen,
    navigationOptions: {
      tabBarVisible: false,
    }
  },
  Picture: {
    screen: MediaFormScreen,
    navigationOptions: {
      tabBarVisible: false,
    }
  },
  Video: {
    screen: MediaFormScreen,
    navigationOptions: {
      tabBarVisible: false,
    }
  },
  Form: {
    screen: ManagerFormScreen,
    navigationOptions: {
      tabBarVisible: false,
    }
  }
}, {
  headerMode: 'none',
  initialRouteName: 'Main',
});

const MessagesStack = TabNavigator({
  Main: {
    screen: DirectMessagesStack,
    navigationOptions: {
      title: strings.messagesScreen.directTab,
    }
  },
  Inbox: {
    screen: MessagesScreen,
    navigationOptions: {
      title: strings.messagesScreen.inboxTab
    }
  },
  Sent: {
    screen: MessagesScreen,
    navigationOptions: {
      title: strings.messagesScreen.sentTab
    }
  },
}, {
  headerMode: 'none',
  tabBarPosition: 'top',
  animationEnabled: true,
  initialRouteName: 'Main',
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
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      drawer: {
        label: 'Home',
      }
    }
  },
  Setting: {
    screen: SettingStack,
  },
  Job: {
    screen: JobStack,
  },
  Profile: {
    screen: ProfileStack,
  },
  Library: {
    screen: LibraryStack,
  },
  HRScreen: {
    screen: HRStack,
  },
  Notes: {
    screen: NotesStack,
  },
  Messages: {
    screen: MessagesStack,
  },
}, {
  contentComponent: CustomDrawer,
  contentOptions: {
    inactiveTintColor: colors.white,
    activeTintColor: colors.white,
  },
  initialRouteName: 'Home',
}
);

const DrawerStack = DrawerNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      drawer: {
        label: 'Home',
      }
    }
  },
  Login: {
    screen: LoginScreen,
    navigationOptions: {
      drawer: {
        label: 'Login',
      }
    }
  },
  Main: {
    screen: MainStack,
  },
}, {
  contentComponent: CustomDrawer,
  contentOptions: {
    inactiveTintColor: colors.white,
    activeTintColor: colors.white,
  },
  headerMode: 'none',
  initialRouteName: 'Main',
}
);

const RootStack = StackNavigator({
  Splash: { screen: SplashScreen },
  Login: { screen: LoginScreen },
  Dash: {
    screen: DrawerStack,
  },
}, {
  headerMode: 'none',
  initialRouteName: 'Login',
});

class RouterComponent extends Component {

  static propTypes = {
    session: PropTypes.any,
	};

  componentWillMount = () => {
    // console.log('router');
    // AuthActions.signIn();
  }

  render() {
    return (
      <RootStack />
    );
  }
}

const mapStateToProps = state => {
  return {
    session: state,
  };
};

const mapDispatchToProps = dispatch => bindActionCreators(AuthActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(RouterComponent);

// export default RouterComponent;
