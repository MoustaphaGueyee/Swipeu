import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Alert,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  Animated,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import { router, useNavigation } from 'expo-router';
import { getAcademicData, updateAcademicData, AcademicAchievement, LeadershipRole, ActivityItem } from '../data/academicDataStore';
import { LinearGradient } from 'expo-linear-gradient';

const EditAcademicInfoScreen = () => {
  const navigation = useNavigation();
  const [gpa, setGpa] = useState('');
  const [satScore, setSatScore] = useState('');
  const [actScore, setActScore] = useState('');
  const [academicAchievements, setAcademicAchievements] = useState<AcademicAchievement[]>([]);
  const [currentAchievement, setCurrentAchievement] = useState('');
  const [leadershipRoles, setLeadershipRoles] = useState<LeadershipRole[]>([]);
  const [currentLeadershipRole, setCurrentLeadershipRole] = useState('');
  const [clubs, setClubs] = useState<ActivityItem[]>([]);
  const [currentClub, setCurrentClub] = useState('');
  const [athletics, setAthletics] = useState<ActivityItem[]>([]);
  const [currentAthletic, setCurrentAthletic] = useState('');
  const [interests, setInterests] = useState<ActivityItem[]>([]);
  const [currentInterest, setCurrentInterest] = useState('');

  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    const data = getAcademicData();
    setGpa(data.gpa);
    setSatScore(data.satScore);
    setActScore(data.actScore);
    setAcademicAchievements(data.academicAchievements);
    setLeadershipRoles(data.leadershipRoles);
    setClubs(data.clubs);
    setAthletics(data.athletics);
    setInterests(data.interests);
    
    // Start animation
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, slideAnim]);

  const handleAddItem = (
    list: ActivityItem[], 
    setList: React.Dispatch<React.SetStateAction<ActivityItem[]>>,
    currentItem: string,
    setCurrentItem: React.Dispatch<React.SetStateAction<string>>
  ) => {
    if (currentItem.trim() !== '') {
      const newItem: ActivityItem = {
        id: Date.now().toString(),
        value: currentItem.trim(),
      };
      setList([...list, newItem]);
      setCurrentItem('');
    }
  };

  const handleRemoveItem = (
    list: ActivityItem[],
    setList: React.Dispatch<React.SetStateAction<ActivityItem[]>>,
    id: string
  ) => {
    setList(list.filter((item) => item.id !== id));
  };

  const handleSave = () => {
    updateAcademicData({
      gpa,
      satScore,
      actScore,
      academicAchievements,
      leadershipRoles,
      clubs,
      athletics,
      interests,
    });
    Alert.alert('Information Saved', 'Your academic information has been updated.', [
      { text: 'OK', onPress: () => router.back() },
    ]);
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false, // Hide the default header
    });
  }, [navigation]);

  const handleBack = () => {
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Custom Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={handleBack}
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Academic Profile</Text>
        <LinearGradient
          colors={['#4A90E2', '#6AB0FF']}
          style={styles.saveButtonGradient}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
        >
          <TouchableOpacity 
            style={styles.saveButton} 
            onPress={handleSave}
            activeOpacity={0.7}
          >
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>

      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <Animated.ScrollView 
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
          style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}
        >
          {/* GPA Section */}
          <LinearGradient
            colors={['#ffffff', '#f9fafb']}
            style={styles.gradientCard}
          >
            <View style={styles.sectionCard}>
              <View style={styles.sectionHeader}>
                <MaterialCommunityIcons name="school" size={22} color="#4285F4" />
                <Text style={styles.sectionTitle}>GPA</Text>
              </View>
              <View style={styles.inputContainer}>
                <MaterialCommunityIcons name="calculator" size={18} color="#999" style={styles.inputIcon} />
                <TextInput 
                  style={styles.input} 
                  value={gpa} 
                  onChangeText={setGpa} 
                  placeholder="Enter your GPA" 
                  keyboardType="decimal-pad"
                  placeholderTextColor="#999"
                />
              </View>
            </View>
          </LinearGradient>

          {/* SAT Score Section */}
          <LinearGradient
            colors={['#ffffff', '#f9fafb']}
            style={styles.gradientCard}
          >
            <View style={styles.sectionCard}>
              <View style={styles.sectionHeader}>
                <MaterialCommunityIcons name="pencil-box-multiple" size={22} color="#EA4335" />
                <Text style={styles.sectionTitle}>SAT Score</Text>
              </View>
              <View style={styles.inputContainer}>
                <MaterialCommunityIcons name="pencil" size={18} color="#999" style={styles.inputIcon} />
                <TextInput 
                  style={styles.input} 
                  value={satScore} 
                  onChangeText={(text) => { 
                    const num = parseInt(text); 
                    if (!text || (num >= 0 && num <= 1600)) 
                      setSatScore(text); 
                  }} 
                  placeholder="Enter SAT score (400-1600)" 
                  keyboardType="number-pad" 
                  maxLength={4}
                  placeholderTextColor="#999"
                />
              </View>
              {satScore ? (
                <View style={styles.scoreIndicator}>
                  <Text style={styles.scoreText}>
                    {parseInt(satScore) > 1400 ? 'Excellent' : 
                     parseInt(satScore) > 1200 ? 'Very Good' : 
                     parseInt(satScore) > 1000 ? 'Good' : 'Average'}
                  </Text>
                </View>
              ) : null}
            </View>
          </LinearGradient>

          {/* ACT Score Section */}
          <LinearGradient
            colors={['#ffffff', '#f9fafb']}
            style={styles.gradientCard}
          >
            <View style={styles.sectionCard}>
              <View style={styles.sectionHeader}>
                <FontAwesome5 name="clipboard-list" size={20} color="#FBBC05" />
                <Text style={styles.sectionTitle}>ACT Score</Text>
              </View>
              <View style={styles.inputContainer}>
                <MaterialCommunityIcons name="format-list-numbered" size={18} color="#999" style={styles.inputIcon} />
                <TextInput 
                  style={styles.input} 
                  value={actScore} 
                  onChangeText={(text) => { 
                    const num = parseInt(text); 
                    if (!text || (num >= 0 && num <= 36)) 
                      setActScore(text); 
                  }} 
                  placeholder="Enter ACT score (1-36)" 
                  keyboardType="number-pad" 
                  maxLength={2}
                  placeholderTextColor="#999"
                />
              </View>
              {actScore ? (
                <View style={[styles.scoreIndicator, {backgroundColor: '#FFF8E1'}]}>
                  <Text style={[styles.scoreText, {color: '#F57F17'}]}>
                    {parseInt(actScore) > 30 ? 'Excellent' : 
                     parseInt(actScore) > 25 ? 'Very Good' : 
                     parseInt(actScore) > 20 ? 'Good' : 'Average'}
                  </Text>
                </View>
              ) : null}
            </View>
          </LinearGradient>

          {/* Academic Achievements Section */}
          <LinearGradient
            colors={['#ffffff', '#f9fafb']}
            style={styles.gradientCard}
          >
            <View style={styles.sectionCard}>
              <View style={styles.sectionHeader}>
                <MaterialCommunityIcons name="trophy-award" size={22} color="#34A853" />
                <Text style={styles.sectionTitle}>Academic Achievements</Text>
              </View>
              <View style={styles.addItemContainer}>
                <View style={styles.inputContainer}>
                  <MaterialCommunityIcons name="star" size={18} color="#999" style={styles.inputIcon} />
                  <TextInput 
                    style={styles.input} 
                    value={currentAchievement} 
                    onChangeText={setCurrentAchievement} 
                    placeholder="Add an achievement" 
                    placeholderTextColor="#999"
                  />
                </View>
                <TouchableOpacity 
                  onPress={() => handleAddItem(academicAchievements, setAcademicAchievements, currentAchievement, setCurrentAchievement)} 
                  style={styles.addButton}
                  activeOpacity={0.8}
                >
                  <Ionicons name="add" size={24} color="#fff" />
                </TouchableOpacity>
              </View>
              {academicAchievements.map((item, index) => (
                <View key={item.id} style={[styles.listItem, { backgroundColor: index % 2 === 0 ? '#f8f9fa' : '#fff' }]}>
                  <Text style={styles.listItemText}>{item.value}</Text>
                  <TouchableOpacity 
                    onPress={() => handleRemoveItem(academicAchievements, setAcademicAchievements, item.id)}
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                  >
                    <MaterialCommunityIcons name="close-circle" size={22} color="#4A90E2" />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </LinearGradient>

          {/* Leadership Roles Section */}
          <LinearGradient
            colors={['#ffffff', '#f9fafb']}
            style={styles.gradientCard}
          >
            <View style={styles.sectionCard}>
              <View style={styles.sectionHeader}>
                <FontAwesome5 name="crown" size={18} color="#FF6B6B" />
                <Text style={styles.sectionTitle}>Leadership Roles</Text>
              </View>
              <View style={styles.addItemContainer}>
                <View style={styles.inputContainer}>
                  <FontAwesome5 name="user-tie" size={16} color="#999" style={styles.inputIcon} />
                  <TextInput 
                    style={styles.input} 
                    value={currentLeadershipRole} 
                    onChangeText={setCurrentLeadershipRole} 
                    placeholder="Add a leadership role"
                    placeholderTextColor="#999" 
                  />
                </View>
                <TouchableOpacity 
                  onPress={() => handleAddItem(leadershipRoles, setLeadershipRoles, currentLeadershipRole, setCurrentLeadershipRole)} 
                  style={styles.addButton}
                  activeOpacity={0.8}
                >
                  <Ionicons name="add" size={24} color="#fff" />
                </TouchableOpacity>
              </View>
              {leadershipRoles.map((item, index) => (
                <View key={item.id} style={[styles.listItem, { backgroundColor: index % 2 === 0 ? '#f8f9fa' : '#fff' }]}>
                  <Text style={styles.listItemText}>{item.value}</Text>
                  <TouchableOpacity 
                    onPress={() => handleRemoveItem(leadershipRoles, setLeadershipRoles, item.id)}
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                  >
                    <MaterialCommunityIcons name="close-circle" size={22} color="#4A90E2" />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </LinearGradient>

          {/* Clubs Section */}
          <LinearGradient
            colors={['#ffffff', '#f9fafb']}
            style={styles.gradientCard}
          >
            <View style={styles.sectionCard}>
              <View style={styles.sectionHeader}>
                <FontAwesome5 name="user-friends" size={18} color="#4285F4" />
                <Text style={styles.sectionTitle}>Clubs</Text>
              </View>
              <View style={styles.addItemContainer}>
                <View style={styles.inputContainer}>
                  <Ionicons name="people" size={18} color="#999" style={styles.inputIcon} />
                  <TextInput 
                    style={styles.input} 
                    value={currentClub} 
                    onChangeText={setCurrentClub} 
                    placeholder="Add a club"
                    placeholderTextColor="#999" 
                  />
                </View>
                <TouchableOpacity 
                  onPress={() => handleAddItem(clubs, setClubs, currentClub, setCurrentClub)} 
                  style={styles.addButton}
                  activeOpacity={0.8}
                >
                  <Ionicons name="add" size={24} color="#fff" />
                </TouchableOpacity>
              </View>
              {clubs.map((item, index) => (
                <View key={item.id} style={[styles.listItem, { backgroundColor: index % 2 === 0 ? '#f8f9fa' : '#fff' }]}>
                  <Text style={styles.listItemText}>{item.value}</Text>
                  <TouchableOpacity 
                    onPress={() => handleRemoveItem(clubs, setClubs, item.id)}
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                  >
                    <MaterialCommunityIcons name="close-circle" size={22} color="#4A90E2" />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </LinearGradient>

          {/* Athletics Section */}
          <LinearGradient
            colors={['#ffffff', '#f9fafb']}
            style={styles.gradientCard}
          >
            <View style={styles.sectionCard}>
              <View style={styles.sectionHeader}>
                <FontAwesome5 name="running" size={18} color="#EA4335" />
                <Text style={styles.sectionTitle}>Athletics (Sports)</Text>
              </View>
              <View style={styles.addItemContainer}>
                <View style={styles.inputContainer}>
                  <Ionicons name="basketball" size={18} color="#999" style={styles.inputIcon} />
                  <TextInput 
                    style={styles.input} 
                    value={currentAthletic} 
                    onChangeText={setCurrentAthletic} 
                    placeholder="Add an athletic activity"
                    placeholderTextColor="#999" 
                  />
                </View>
                <TouchableOpacity 
                  onPress={() => handleAddItem(athletics, setAthletics, currentAthletic, setCurrentAthletic)} 
                  style={styles.addButton}
                  activeOpacity={0.8}
                >
                  <Ionicons name="add" size={24} color="#fff" />
                </TouchableOpacity>
              </View>
              {athletics.map((item, index) => (
                <View key={item.id} style={[styles.listItem, { backgroundColor: index % 2 === 0 ? '#f8f9fa' : '#fff' }]}>
                  <Text style={styles.listItemText}>{item.value}</Text>
                  <TouchableOpacity 
                    onPress={() => handleRemoveItem(athletics, setAthletics, item.id)}
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                  >
                    <MaterialCommunityIcons name="close-circle" size={22} color="#4A90E2" />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </LinearGradient>

          {/* Interests Section */}
          <LinearGradient
            colors={['#ffffff', '#f9fafb']}
            style={styles.gradientCard}
          >
            <View style={styles.sectionCard}>
              <View style={styles.sectionHeader}>
                <FontAwesome5 name="lightbulb" size={18} color="#FBBC05" />
                <Text style={styles.sectionTitle}>Interests</Text>
              </View>
              <View style={styles.addItemContainer}>
                <View style={styles.inputContainer}>
                  <Ionicons name="heart" size={18} color="#999" style={styles.inputIcon} />
                  <TextInput 
                    style={styles.input} 
                    value={currentInterest} 
                    onChangeText={setCurrentInterest} 
                    placeholder="Add an interest"
                    placeholderTextColor="#999" 
                  />
                </View>
                <TouchableOpacity 
                  onPress={() => handleAddItem(interests, setInterests, currentInterest, setCurrentInterest)} 
                  style={styles.addButton}
                  activeOpacity={0.8}
                >
                  <Ionicons name="add" size={24} color="#fff" />
                </TouchableOpacity>
              </View>
              {interests.map((item, index) => (
                <View key={item.id} style={[styles.listItem, { backgroundColor: index % 2 === 0 ? '#f8f9fa' : '#fff' }]}>
                  <Text style={styles.listItemText}>{item.value}</Text>
                  <TouchableOpacity 
                    onPress={() => handleRemoveItem(interests, setInterests, item.id)}
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                  >
                    <MaterialCommunityIcons name="close-circle" size={22} color="#4A90E2" />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </LinearGradient>

          {/* Bottom padding */}
          <View style={{ height: 40 }} />
        </Animated.ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fa',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  backButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  saveButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
  },
  saveButtonGradient: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 15,
  },
  scrollContainer: {
    padding: 16,
  },
  gradientCard: {
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3.84,
    elevation: 2,
  },
  sectionCard: {
    backgroundColor: 'transparent',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#333',
    marginLeft: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e8e8e8',
    paddingHorizontal: 10,
    flex: 1,
    minWidth: 0,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    color: '#333',
  },
  scoreIndicator: {
    alignSelf: 'flex-start',
    marginTop: 8,
    backgroundColor: '#E3F2FD',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  scoreText: {
    color: '#1976D2',
    fontWeight: '500',
    fontSize: 12,
  },
  addItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 5,
  },
  addItemInput: {
    flex: 1,
    marginRight: 10,
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    color: '#333',
    borderWidth: 1,
    borderColor: '#e8e8e8',
  },
  addButton: {
    backgroundColor: '#4A90E2',
    padding: 12,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#4A90E2',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
    transform: [{ scale: 1 }],
    marginLeft: 10,
    flexShrink: 0,
    maxWidth: 48,
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 14,
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#f0f0f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  listItemText: {
    fontSize: 15,
    color: '#333',
    flex: 1,
    fontWeight: '500',
  },
});

export default EditAcademicInfoScreen; 