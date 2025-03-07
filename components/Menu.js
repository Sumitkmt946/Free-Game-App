import React, { useState, useMemo, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Switch,
} from 'react-native';
import { useTheme } from '../src/context/ThemeContext';


export default function Menu({ visible, onClose, navigation }) {
  if (!visible) return null;

  const themeContext = useTheme();
  const isDarkMode = themeContext?.isDarkMode || false;
  const toggleTheme = themeContext?.toggleTheme || (() => {});

  const [profileOpen, setProfileOpen] = useState(false);
  const [dashboardOpen, setDashboardOpen] = useState(false);

  const handleNavigation = useCallback(
    (screen) => {
      onClose();
      navigation.navigate(screen);
    },
    [onClose, navigation]
  );

  const styles = useMemo(
    () =>
      StyleSheet.create({
        overlay: {
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.4)',
          justifyContent: 'flex-start',
          alignItems: 'flex-end',
        },
        menu: {
          width: 250,
          backgroundColor: isDarkMode ? '#222' : '#fff',
          padding: 20,
          height: '100%',
          borderTopLeftRadius: 10,
          borderBottomLeftRadius: 10,
          elevation: 5,
          shadowColor: '#000',
          shadowOffset: { width: -2, height: 2 },
          shadowOpacity: 0.3,
          shadowRadius: 4,
        },
        menuHeader: {
          fontSize: 20,
          fontWeight: 'bold',
          marginBottom: 15,
          color: isDarkMode ? '#fff' : '#000',
        },
        menuItem: {
          fontSize: 16,
          marginVertical: 8,
          color: isDarkMode ? '#ccc' : '#333',
        },
        subMenu: {
          marginLeft: 20,
          marginVertical: 5,
        },
        subMenuItem: {
          fontSize: 14,
          marginVertical: 4,
          color: isDarkMode ? '#bbb' : '#555',
        },
        themeToggle: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginVertical: 10,
        },
        closeButton: {
          marginTop: 20,
          backgroundColor: '#4e8cff',
          paddingVertical: 10,
          borderRadius: 6,
          alignItems: 'center',
        },
        closeButtonText: {
          color: '#fff',
          fontSize: 16,
        },
      }),
    [isDarkMode]
  );

  return (
    <Modal transparent={true} animationType="fade" visible={visible} onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.menu}>
          <Text style={styles.menuHeader}>Menu</Text>

          {/* Theme Toggle */}
          <View style={styles.themeToggle}>
            <Text style={styles.menuItem}>Dark Mode</Text>
            <Switch value={isDarkMode} onValueChange={toggleTheme} />
          </View>

          <TouchableOpacity onPress={() => setProfileOpen(!profileOpen)}>
            <Text style={styles.menuItem}>Profile</Text>
          </TouchableOpacity>
          {profileOpen && (
            <View style={styles.subMenu}>
            </View>
          )}

          <TouchableOpacity onPress={() => setDashboardOpen(!dashboardOpen)}>
            <Text style={styles.menuItem}>Dashboard</Text>
          </TouchableOpacity>
          {dashboardOpen && (
            <View style={styles.subMenu}>
              <TouchableOpacity onPress={() => handleNavigation('Analysis')}>
                <Text style={styles.subMenuItem}>Analysis</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleNavigation('History')}>
                <Text style={styles.subMenuItem}>History</Text>
              </TouchableOpacity>
              
            </View>
          )}

          <TouchableOpacity onPress={() => { onClose(); navigation.replace('Login'); }}>
            <Text style={styles.menuItem}>Logout</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
