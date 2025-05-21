import React, { useState, useRef, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Alert,
  TextInput,
  Modal,
  KeyboardAvoidingView,
  Platform,
  Animated,
  Switch,
  Image
} from 'react-native';
import { Ionicons, MaterialCommunityIcons, FontAwesome5, Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import { BlurView } from 'expo-blur';

const AccountManagementScreen = () => {
  // State variables
  const [email, setEmail] = useState('alex@gmail.com');
  const [newEmail, setNewEmail] = useState('');
  const [phone, setPhone] = useState('(555) 123-4567');
  const [newPhone, setNewPhone] = useState('');
  const [currentSubscription, setCurrentSubscription] = useState('Premium');
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(true);
  const [isDarkModeEnabled, setIsDarkModeEnabled] = useState(false);
  
  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const subscriptionScaleAnim = useRef(new Animated.Value(0.95)).current;
  
  // Modal visibility states
  const [emailModalVisible, setEmailModalVisible] = useState(false);
  const [passwordModalVisible, setPasswordModalVisible] = useState(false);
  const [phoneModalVisible, setPhoneModalVisible] = useState(false);
  
  // Run animations on component mount
  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.spring(subscriptionScaleAnim, {
        toValue: 1,
        friction: 8,
        tension: 40,
        useNativeDriver: true,
      })
    ]).start();
  }, []);
  
  // Navigation
  const navigateBack = () => {
    router.back();
  };
  
  // Email update
  const openEmailModal = () => {
    setNewEmail(email);
    setEmailModalVisible(true);
  };
  
  const closeEmailModal = () => {
    setEmailModalVisible(false);
  };
  
  const saveEmail = () => {
    if (newEmail.trim() === '') {
      Alert.alert('Error', 'Email cannot be empty');
      return;
    }
    
    if (!newEmail.includes('@') || !newEmail.includes('.')) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }
    
    setEmail(newEmail);
    setEmailModalVisible(false);
    Alert.alert('Success', 'Email has been updated');
  };
  
  // Password update
  const openPasswordModal = () => {
    setPasswordModalVisible(true);
  };
  
  const closePasswordModal = () => {
    setPasswordModalVisible(false);
  };
  
  const savePassword = () => {
    // Password validation would happen here
    setPasswordModalVisible(false);
    Alert.alert('Success', 'Password has been updated');
  };
  
  // Phone update
  const openPhoneModal = () => {
    setNewPhone(phone);
    setPhoneModalVisible(true);
  };
  
  const closePhoneModal = () => {
    setPhoneModalVisible(false);
  };
  
  const savePhone = () => {
    if (newPhone.trim() === '') {
      Alert.alert('Error', 'Phone number cannot be empty');
      return;
    }
    
    setPhone(newPhone);
    setPhoneModalVisible(false);
    Alert.alert('Success', 'Phone number has been updated');
  };
  
  // Subscription management
  const manageSubscription = () => {
    Alert.alert(
      'Manage Subscription',
      `Your current plan: ${currentSubscription}\n\nWould you like to change your subscription?`,
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'Upgrade',
          onPress: () => Alert.alert('Upgrade', 'Navigating to upgrade options')
        },
        {
          text: 'Downgrade',
          onPress: () => Alert.alert('Downgrade', 'Navigating to downgrade options')
        }
      ]
    );
  };

  // Toggle notifications
  const toggleNotifications = () => {
    setIsNotificationsEnabled(previousState => !previousState);
  };

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkModeEnabled(previousState => !previousState);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={navigateBack}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Account Settings</Text>
        <View style={styles.backButton} />
      </View>
      
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View 
          style={[
            styles.profilePreview, 
            {opacity: fadeAnim, transform: [{translateY: slideAnim}]}
          ]}
        >
          <View style={styles.profileImageContainer}>
            <Image 
              source={{ uri: 'https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png' }} 
              style={styles.profileImage} 
            />
            <TouchableOpacity style={styles.editProfileButton}>
              <Feather name="edit-2" size={14} color="#fff" />
            </TouchableOpacity>
          </View>
          <Text style={styles.profileName}>Alex Smith</Text>
          <TouchableOpacity 
            style={styles.viewProfileButton}
            onPress={() => router.push('/profile')}
          >
            <Text style={styles.viewProfileText}>View Profile</Text>
          </TouchableOpacity>
        </Animated.View>

        <Animated.Text 
          style={[
            styles.sectionTitle, 
            {opacity: fadeAnim, transform: [{translateY: slideAnim}]}
          ]}
        >
          Personal Information
        </Animated.Text>
        
        {/* Email */}
        <Animated.View style={{opacity: fadeAnim, transform: [{translateY: slideAnim}]}}>
          <TouchableOpacity style={styles.settingItem} onPress={openEmailModal}>
            <View style={styles.settingIconContainer}>
              <MaterialCommunityIcons name="email-outline" size={22} color="#4285F4" />
            </View>
            <View style={styles.settingTextContainer}>
              <Text style={styles.settingLabel}>Email</Text>
              <Text style={styles.settingValue}>{email}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </TouchableOpacity>
        </Animated.View>
        
        {/* Password */}
        <Animated.View style={{opacity: fadeAnim, transform: [{translateY: slideAnim}], marginTop: 10}}>
          <TouchableOpacity style={styles.settingItem} onPress={openPasswordModal}>
            <View style={styles.settingIconContainer}>
              <MaterialCommunityIcons name="lock-outline" size={22} color="#EA4335" />
            </View>
            <View style={styles.settingTextContainer}>
              <Text style={styles.settingLabel}>Password</Text>
              <Text style={styles.settingValue}>••••••••</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </TouchableOpacity>
        </Animated.View>
        
        {/* Phone Number */}
        <Animated.View style={{opacity: fadeAnim, transform: [{translateY: slideAnim}], marginTop: 10}}>
          <TouchableOpacity style={styles.settingItem} onPress={openPhoneModal}>
            <View style={styles.settingIconContainer}>
              <MaterialCommunityIcons name="phone-outline" size={22} color="#34A853" />
            </View>
            <View style={styles.settingTextContainer}>
              <Text style={styles.settingLabel}>Phone Number</Text>
              <Text style={styles.settingValue}>{phone}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </TouchableOpacity>
        </Animated.View>

        <Animated.Text 
          style={[
            styles.sectionTitle, 
            {opacity: fadeAnim, transform: [{translateY: slideAnim}]}
          ]}
        >
          Preferences
        </Animated.Text>

        {/* Notifications */}
        <Animated.View style={{opacity: fadeAnim, transform: [{translateY: slideAnim}]}}>
          <View style={styles.settingItem}>
            <View style={styles.settingIconContainer}>
              <MaterialCommunityIcons name="bell-outline" size={22} color="#FBBC05" />
            </View>
            <View style={styles.settingTextContainer}>
              <Text style={styles.settingLabel}>Notifications</Text>
              <Text style={styles.settingValue}>
                {isNotificationsEnabled ? 'Enabled' : 'Disabled'}
              </Text>
            </View>
            <Switch
              trackColor={{ false: "#e0e0e0", true: "#FBBC05" }}
              thumbColor={isNotificationsEnabled ? "#fff" : "#fff"}
              ios_backgroundColor="#e0e0e0"
              onValueChange={toggleNotifications}
              value={isNotificationsEnabled}
            />
          </View>
        </Animated.View>

        {/* Dark Mode */}
        <Animated.View style={{opacity: fadeAnim, transform: [{translateY: slideAnim}], marginTop: 10}}>
          <View style={styles.settingItem}>
            <View style={styles.settingIconContainer}>
              <MaterialCommunityIcons name="theme-light-dark" size={22} color="#9C27B0" />
            </View>
            <View style={styles.settingTextContainer}>
              <Text style={styles.settingLabel}>Dark Mode</Text>
              <Text style={styles.settingValue}>
                {isDarkModeEnabled ? 'Enabled' : 'Disabled'}
              </Text>
            </View>
            <Switch
              trackColor={{ false: "#e0e0e0", true: "#9C27B0" }}
              thumbColor={isDarkModeEnabled ? "#fff" : "#fff"}
              ios_backgroundColor="#e0e0e0"
              onValueChange={toggleDarkMode}
              value={isDarkModeEnabled}
            />
          </View>
        </Animated.View>
        
        <Animated.Text 
          style={[
            styles.sectionTitle, 
            {opacity: fadeAnim, transform: [{translateY: slideAnim}]}
          ]}
        >
          Subscription
        </Animated.Text>
        
        {/* Current Subscription */}
        <Animated.View 
          style={{
            transform: [
              {scale: subscriptionScaleAnim}
            ]
          }}
        >
          <View style={styles.subscriptionContainer}>
            <View style={styles.premiumIconContainer}>
              <MaterialCommunityIcons name="crown" size={28} color="#FFD700" />
            </View>
            <View style={styles.subscriptionHeader}>
              <Text style={styles.subscriptionTitle}>Current Plan</Text>
              <View style={styles.subscriptionBadge}>
                <Text style={styles.subscriptionBadgeText}>{currentSubscription}</Text>
              </View>
            </View>
            
            <Text style={styles.subscriptionDescription}>
              Your {currentSubscription} subscription gives you unlimited swipes and premium features.
            </Text>

            <View style={styles.benefitsContainer}>
              <View style={styles.benefitItem}>
                <Ionicons name="checkmark-circle" size={18} color="#34A853" />
                <Text style={styles.benefitText}>Unlimited swipes</Text>
              </View>
              <View style={styles.benefitItem}>
                <Ionicons name="checkmark-circle" size={18} color="#34A853" />
                <Text style={styles.benefitText}>See who liked you</Text>
              </View>
              <View style={styles.benefitItem}>
                <Ionicons name="checkmark-circle" size={18} color="#34A853" />
                <Text style={styles.benefitText}>Advanced filters</Text>
              </View>
            </View>
            
            <TouchableOpacity style={styles.manageSubscriptionButton} onPress={manageSubscription}>
              <Text style={styles.manageSubscriptionText}>Manage Subscription</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
        
        {/* Danger Zone */}
        <Animated.Text 
          style={[
            styles.sectionTitle, 
            styles.dangerSectionTitle,
            {opacity: fadeAnim, transform: [{translateY: slideAnim}]}
          ]}
        >
          Danger Zone
        </Animated.Text>
        
        <Animated.View style={{opacity: fadeAnim, transform: [{translateY: slideAnim}]}}>
          <TouchableOpacity 
            style={styles.dangerButton} 
            onPress={() => Alert.alert(
              'Delete Account',
              'Are you sure you want to delete your account? This action cannot be undone.',
              [
                {
                  text: 'Cancel',
                  style: 'cancel'
                },
                {
                  text: 'Delete',
                  style: 'destructive',
                  onPress: () => Alert.alert('Account Deleted', 'Your account has been deleted')
                }
              ]
            )}
          >
            <MaterialCommunityIcons name="delete-outline" size={22} color="#ff3b30" style={{marginRight: 10}} />
            <Text style={styles.dangerButtonText}>Delete Account</Text>
          </TouchableOpacity>
        </Animated.View>
      </ScrollView>
      
      {/* Email Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={emailModalVisible}
        onRequestClose={closeEmailModal}
      >
        <BlurView intensity={90} style={styles.modalBlur}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.modalContainer}
          >
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <MaterialCommunityIcons name="email-outline" size={28} color="#4285F4" style={styles.modalIcon} />
                <Text style={styles.modalTitle}>Change Email</Text>
                <TouchableOpacity onPress={closeEmailModal} style={styles.closeButton}>
                  <Ionicons name="close" size={24} color="#333" />
                </TouchableOpacity>
              </View>
              
              <View style={styles.modalBody}>
                <Text style={styles.inputLabel}>New Email</Text>
                <TextInput
                  style={styles.input}
                  value={newEmail}
                  onChangeText={setNewEmail}
                  placeholder="Enter your new email"
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
              
              <View style={styles.modalFooter}>
                <TouchableOpacity 
                  style={[styles.modalButton, styles.cancelButton]} 
                  onPress={closeEmailModal}
                >
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.modalButton, styles.saveButton]} 
                  onPress={saveEmail}
                >
                  <Text style={styles.saveButtonText}>Save</Text>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>
        </BlurView>
      </Modal>
      
      {/* Password Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={passwordModalVisible}
        onRequestClose={closePasswordModal}
      >
        <BlurView intensity={90} style={styles.modalBlur}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.modalContainer}
          >
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <MaterialCommunityIcons name="lock-outline" size={28} color="#EA4335" style={styles.modalIcon} />
                <Text style={styles.modalTitle}>Change Password</Text>
                <TouchableOpacity onPress={closePasswordModal} style={styles.closeButton}>
                  <Ionicons name="close" size={24} color="#333" />
                </TouchableOpacity>
              </View>
              
              <View style={styles.modalBody}>
                <Text style={styles.inputLabel}>Current Password</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your current password"
                  secureTextEntry
                />
                
                <Text style={[styles.inputLabel, { marginTop: 15 }]}>New Password</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your new password"
                  secureTextEntry
                />
                
                <Text style={[styles.inputLabel, { marginTop: 15 }]}>Confirm New Password</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Confirm your new password"
                  secureTextEntry
                />
              </View>
              
              <View style={styles.modalFooter}>
                <TouchableOpacity 
                  style={[styles.modalButton, styles.cancelButton]} 
                  onPress={closePasswordModal}
                >
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.modalButton, styles.saveButton]} 
                  onPress={savePassword}
                >
                  <Text style={styles.saveButtonText}>Save</Text>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>
        </BlurView>
      </Modal>
      
      {/* Phone Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={phoneModalVisible}
        onRequestClose={closePhoneModal}
      >
        <BlurView intensity={90} style={styles.modalBlur}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.modalContainer}
          >
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <MaterialCommunityIcons name="phone-outline" size={28} color="#34A853" style={styles.modalIcon} />
                <Text style={styles.modalTitle}>Change Phone Number</Text>
                <TouchableOpacity onPress={closePhoneModal} style={styles.closeButton}>
                  <Ionicons name="close" size={24} color="#333" />
                </TouchableOpacity>
              </View>
              
              <View style={styles.modalBody}>
                <Text style={styles.inputLabel}>New Phone Number</Text>
                <TextInput
                  style={styles.input}
                  value={newPhone}
                  onChangeText={setNewPhone}
                  placeholder="Enter your new phone number"
                  keyboardType="phone-pad"
                />
              </View>
              
              <View style={styles.modalFooter}>
                <TouchableOpacity 
                  style={[styles.modalButton, styles.cancelButton]} 
                  onPress={closePhoneModal}
                >
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.modalButton, styles.saveButton]} 
                  onPress={savePhone}
                >
                  <Text style={styles.saveButtonText}>Save</Text>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>
        </BlurView>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
  },
  backButton: {
    padding: 5,
    width: 40,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  scrollContent: {
    padding: 20,
  },
  profilePreview: {
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 10,
  },
  profileImageContainer: {
    position: 'relative',
    marginBottom: 12,
  },
  profileImage: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 3,
    borderColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  editProfileButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#FF6B6B',
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  viewProfileButton: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  viewProfileText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#666',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
    marginBottom: 15,
    marginTop: 25,
  },
  dangerSectionTitle: {
    color: '#ff3b30',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  settingIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.03)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  settingTextContainer: {
    flex: 1,
  },
  settingLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
    marginBottom: 4,
  },
  settingValue: {
    fontSize: 16,
    color: '#333',
  },
  subscriptionContainer: {
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  premiumIconContainer: {
    alignSelf: 'center',
    marginBottom: 16,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 215, 0, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  subscriptionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  subscriptionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  subscriptionBadge: {
    backgroundColor: '#FF6B6B',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
  },
  subscriptionBadgeText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  subscriptionDescription: {
    fontSize: 15,
    color: '#666',
    marginBottom: 20,
    lineHeight: 22,
  },
  benefitsContainer: {
    marginBottom: 20,
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 12,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  benefitText: {
    marginLeft: 10,
    fontSize: 14,
    color: '#555',
  },
  manageSubscriptionButton: {
    backgroundColor: '#F0F7FF',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D0E2FF',
  },
  manageSubscriptionText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#4285F4',
  },
  dangerButton: {
    flexDirection: 'row',
    backgroundColor: '#FFF5F5',
    borderWidth: 1,
    borderColor: '#FFDFDF',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
  },
  dangerButtonText: {
    color: '#ff3b30',
    fontSize: 16,
    fontWeight: '600',
  },
  // Modal styles
  modalBlur: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 16,
    width: '90%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
    overflow: 'hidden',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    position: 'relative',
  },
  modalIcon: {
    marginRight: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  closeButton: {
    position: 'absolute',
    right: 16,
    top: 16,
  },
  modalBody: {
    padding: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#f5f7fa',
    borderRadius: 12,
    padding: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#e8e8e8',
  },
  modalFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  modalButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#f5f7fa',
    marginRight: 10,
  },
  saveButton: {
    backgroundColor: '#FF6B6B',
    marginLeft: 10,
  },
  cancelButtonText: {
    color: '#666',
    fontSize: 16,
    fontWeight: '500',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default AccountManagementScreen; 