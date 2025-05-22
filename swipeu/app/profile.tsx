import React, { useState, useEffect, useCallback } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
  SafeAreaView,
  StatusBar,
  Modal,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  FlatList,
  Dimensions,
  ImageBackground,
  Animated,
} from 'react-native';
import { Ionicons, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { router, useFocusEffect } from 'expo-router';
import { getAcademicData, AcademicAchievement, LeadershipRole, ActivityItem } from '../data/academicDataStore';

const DEFAULT_PROFILE_PIC = 'https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png';
const { width } = Dimensions.get('window');

const ProfileScreen = () => {
  const [userName, setUserName] = useState('Alex');
  const [userEmail, setUserEmail] = useState('alex@gmail.com');
  const [profilePic, setProfilePic] = useState(DEFAULT_PROFILE_PIC);
  
  const [gpa, setGPA] = useState('');
  const [satScore, setSATScore] = useState('');
  const [actScore, setACTScore] = useState('');
  const [academicAchievements, setAcademicAchievements] = useState<AcademicAchievement[]>([]);
  const [leadershipRoles, setLeadershipRoles] = useState<LeadershipRole[]>([]);
  const [clubs, setClubs] = useState<ActivityItem[]>([]);
  const [athletics, setAthletics] = useState<ActivityItem[]>([]);
  const [interests, setInterests] = useState<ActivityItem[]>([]);
  
  const [activeTab, setActiveTab] = useState('academics');
  const [animatedValues] = useState({
    gpa: new Animated.Value(0),
    sat: new Animated.Value(0),
    act: new Animated.Value(0),
    achievements: new Animated.Value(0),
    clubs: new Animated.Value(0),
    athletics: new Animated.Value(0),
    interests: new Animated.Value(0),
  });

  const loadDataFromStore = useCallback(() => {
    const data = getAcademicData();
    setGPA(data.gpa);
    setSATScore(data.satScore);
    setACTScore(data.actScore);
    setAcademicAchievements(data.academicAchievements);
    setLeadershipRoles(data.leadershipRoles);
    setClubs(data.clubs);
    setAthletics(data.athletics);
    setInterests(data.interests);
    console.log('Profile screen loaded data from store:', data);

    Animated.parallel([
      Animated.timing(animatedValues.gpa, {
        toValue: data.gpa ? parseFloat(data.gpa) / 4.0 : 0, 
        duration: 800,
        useNativeDriver: false
      }),
      Animated.timing(animatedValues.sat, {
        toValue: data.satScore ? parseInt(data.satScore) / 1600 : 0,
        duration: 800,
        useNativeDriver: false
      }),
      Animated.timing(animatedValues.act, {
        toValue: data.actScore ? parseInt(data.actScore) / 36 : 0,
        duration: 800,
        useNativeDriver: false
      }),
      Animated.timing(animatedValues.achievements, {
        toValue: data.academicAchievements.length / 5, 
        duration: 800,
        useNativeDriver: false
      }),
      Animated.timing(animatedValues.clubs, {
        toValue: data.clubs.length / 10, 
        duration: 800,
        useNativeDriver: false
      }),
      Animated.timing(animatedValues.athletics, {
        toValue: data.athletics.length / 3, 
        duration: 800,
        useNativeDriver: false
      }),
      Animated.timing(animatedValues.interests, {
        toValue: data.interests.length / 5, 
        duration: 800,
        useNativeDriver: false
      })
    ]).start();
  }, [animatedValues]);

  useFocusEffect(loadDataFromStore);

  const handleManage = () => router.push('/account-management');
  const handleChangePicture = () => Alert.alert('Change Picture', 'This would open the image picker');
  const navigateToHome = () => router.replace('/');

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Logout', style: 'destructive', onPress: () => { router.replace('/'); Alert.alert('Logged Out'); } }
    ]);
  };

  const getProgressWidth = (animValue: Animated.Value) => animValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
    extrapolate: 'clamp'
  });

  const renderTabContent = () => {
    switch(activeTab) {
      case 'academics':
        return (
          <View style={styles.statsTabContent}>
            <View style={styles.statItem}>
              <View style={styles.statHeader}>
                <MaterialCommunityIcons name="school" size={20} color="#4285F4" />
                <Text style={styles.statLabel}>GPA</Text>
                <Text style={styles.statValue}>{gpa || 'N/A'}</Text>
              </View>
              <View style={styles.progressBarContainer}>
                <Animated.View style={[styles.progressBar, { width: getProgressWidth(animatedValues.gpa), backgroundColor: '#4285F4' }]} />
              </View>
              <Text style={styles.statContext}>{gpa ? `Top ${Math.round((parseFloat(gpa)/4.0)*100)}% of your class` : '-'}</Text>
            </View>
            <View style={styles.statItem}>
              <View style={styles.statHeader}>
                <MaterialCommunityIcons name="pencil-box-multiple" size={20} color="#EA4335" />
                <Text style={styles.statLabel}>SAT</Text>
                <Text style={styles.statValue}>{satScore || 'N/A'}</Text>
              </View>
              <View style={styles.progressBarContainer}>
                <Animated.View style={[styles.progressBar, { width: getProgressWidth(animatedValues.sat), backgroundColor: '#EA4335' }]} />
              </View>
              <Text style={styles.statContext}>{satScore ? `Top ${Math.round((parseInt(satScore)/1600)*100)}% nationally` : '-'}</Text>
            </View>
            <View style={styles.statItem}>
              <View style={styles.statHeader}>
                <MaterialCommunityIcons name="format-list-numbered" size={20} color="#FBBC05" />
                <Text style={styles.statLabel}>ACT</Text>
                <Text style={styles.statValue}>{actScore || 'N/A'}</Text>
              </View>
              <View style={styles.progressBarContainer}>
                <Animated.View style={[styles.progressBar, { width: getProgressWidth(animatedValues.act), backgroundColor: '#FBBC05' }]} />
              </View>
              <Text style={styles.statContext}>{actScore ? `Top ${Math.round((parseInt(actScore)/36)*100)}% nationally` : '-'}</Text>
            </View>
            <View style={styles.statItem}>
              <View style={styles.statHeader}>
                <MaterialCommunityIcons name="trophy-award" size={20} color="#FBBC05" />
                <Text style={styles.statLabel}>Achievements</Text>
                <Text style={styles.statValue}>{academicAchievements.length}</Text>
              </View>
              {academicAchievements.length > 0 ? (
                <View style={styles.badgesContainer}>
                  {academicAchievements.map((item) => (<View key={item.id} style={styles.badge}><Text style={styles.badgeText}>{item.value}</Text></View>))}
                </View>
              ) : <Text style={styles.emptyListText}>No achievements added yet</Text>}
            </View>
          </View>
        );
      case 'activities':
        return (
          <View style={styles.statsTabContent}>
            <View style={styles.statItem}>
              <View style={styles.statHeader}>
                <FontAwesome5 name="user-friends" size={20} color="#34A853" />
                <Text style={styles.statLabel}>Clubs</Text>
                <Text style={styles.statValue}>{clubs.length}</Text>
              </View>
              <View style={styles.progressBarContainer}>
                <Animated.View style={[styles.progressBar, { width: getProgressWidth(animatedValues.clubs), backgroundColor: '#34A853' }]} />
              </View>
              {clubs.length > 0 && (
                <View style={styles.tagsContainer}>
                  {clubs.slice(0, 3).map((item) => (<View key={item.id} style={styles.tag}><Text style={styles.tagText}>{item.value}</Text></View>))}
                  {clubs.length > 3 && <View style={styles.tag}><Text style={styles.tagText}>+{clubs.length - 3} more</Text></View>}
                </View>
              )}
            </View>
            <View style={styles.statItem}>
              <View style={styles.statHeader}>
                <FontAwesome5 name="running" size={20} color="#4285F4" />
                <Text style={styles.statLabel}>Sports</Text> {/* Changed from Athletics to Sports for display consistency */}
                <Text style={styles.statValue}>{athletics.length}</Text>
              </View>
              <View style={styles.progressBarContainer}>
                <Animated.View style={[styles.progressBar, { width: getProgressWidth(animatedValues.athletics), backgroundColor: '#4285F4' }]} />
              </View>
              {athletics.length > 0 && (
                <View style={styles.tagsContainer}>
                  {athletics.map((item) => (<View key={item.id} style={[styles.tag, {backgroundColor: '#E1F5FE'}]}><Text style={[styles.tagText, {color: '#0288D1'}]}>{item.value}</Text></View>))}
                </View>
              )}
            </View>
            <View style={styles.statItem}>
              <View style={styles.statHeader}>
                <FontAwesome5 name="lightbulb" size={20} color="#FBBC05" />
                <Text style={styles.statLabel}>Interests</Text>
                <Text style={styles.statValue}>{interests.length}</Text>
              </View>
              <View style={styles.progressBarContainer}>
                <Animated.View style={[styles.progressBar, { width: getProgressWidth(animatedValues.interests), backgroundColor: '#FBBC05' }]} />
              </View>
              {interests.length > 0 && (
                <View style={styles.tagsContainer}>
                  {interests.map((item) => (<View key={item.id} style={[styles.tag, {backgroundColor: '#FFF9C4'}]}><Text style={[styles.tagText, {color: '#F57F17'}]}>{item.value}</Text></View>))}
                </View>
              )}
            </View>
          </View>
        );
      case 'leadership':
        return (
          <View style={styles.statsTabContent}>
            <View style={styles.statItem}>
              <View style={styles.statHeader}>
                <FontAwesome5 name="crown" size={20} color="#EA4335" />
                <Text style={styles.statLabel}>Leadership Roles</Text>
                <Text style={styles.statValue}>{leadershipRoles.length}</Text>
              </View>
              {leadershipRoles.length > 0 ? (
                <View style={styles.leadershipContainer}>
                  {leadershipRoles.map((item) => (<View key={item.id} style={styles.leadershipItem}><FontAwesome5 name="star" size={16} color="#FFD700" style={styles.leadershipIcon} /><Text style={styles.leadershipText}>{item.value}</Text></View>))}
                </View>
              ) : <Text style={styles.emptyListText}>No leadership roles added yet</Text>}
            </View>
          </View>
        );
      default: return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={navigateToHome}><Ionicons name="arrow-back" size={24} color="#333" /></TouchableOpacity>
        <Text style={styles.greeting}>Hey, {userName}!</Text>
        <TouchableOpacity style={styles.manageButton} onPress={handleManage}><Text style={styles.manageText}>Manage</Text></TouchableOpacity>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.profileSection}>
          <View style={styles.profilePicContainer}>
            <TouchableOpacity onPress={handleChangePicture}>
              <Image source={{ uri: profilePic }} style={styles.profilePic} />
            </TouchableOpacity>
          </View>
          <Text style={styles.email}>{userEmail}</Text>
        </View>
        <View style={styles.quickStatsContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.sectionTitle}>Quick Stats</Text>
            <TouchableOpacity style={styles.editIcon} onPress={() => router.push('/edit-academic-info')}><Ionicons name="create-outline" size={20} color="#fff" /></TouchableOpacity>
          </View>
          <View style={styles.tabsContainer}>
            {['academics', 'activities', 'leadership'].map((tabName, index) => (
              <TouchableOpacity 
                key={tabName} 
                style={[styles.tab, activeTab === tabName && styles.activeTab]} 
                onPress={() => setActiveTab(tabName)}
              >
                <MaterialCommunityIcons 
                  name={tabName === 'academics' ? "school" : tabName === 'activities' ? "run-fast" : "crown"} 
                  size={18} 
                  color={activeTab === tabName ? '#4A90E2' : '#666'} 
                />
                <Text style={[styles.tabText, activeTab === tabName && styles.activeTabText]}>
                  {tabName.charAt(0).toUpperCase() + tabName.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          {renderTabContent()}
        </View>
        <View style={styles.actionButtonsContainer}>
          <TouchableOpacity style={styles.actionButton} onPress={() => router.push('/communities')}>
            <View style={[styles.iconCircle, { backgroundColor: 'rgba(74, 144, 226, 0.15)' }]}><Ionicons name="people" size={24} color="#4A90E2" /></View>
            <Text style={styles.actionButtonText}>Communities</Text>
            <Ionicons name="chevron-forward" size={20} color="#ccc" style={styles.actionArrow} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={() => router.push('/swipes-history')}>
            <View style={[styles.iconCircle, { backgroundColor: 'rgba(74, 144, 226, 0.15)' }]}><Ionicons name="heart" size={24} color="#4A90E2" /></View>
            <Text style={styles.actionButtonText}>Swipes</Text>
            <Ionicons name="chevron-forward" size={20} color="#ccc" style={styles.actionArrow} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={() => router.push('/recommended-colleges')}>
            <View style={[styles.iconCircle, { backgroundColor: 'rgba(74, 144, 226, 0.15)' }]}><Ionicons name="star" size={24} color="#4A90E2" /></View>
            <Text style={styles.actionButtonText}>Recommended</Text>
            <Ionicons name="chevron-forward" size={20} color="#ccc" style={styles.actionArrow} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}><Text style={styles.logoutText}>Logout</Text></TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f7fa' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 15, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
  backButton: { padding: 5, width: 40 },
  greeting: { fontSize: 20, fontWeight: 'bold', color: '#333' },
  manageButton: { padding: 5 },
  manageText: { fontSize: 16, color: '#4A90E2', fontWeight: '500' },
  scrollContent: { padding: 20 },
  profileSection: { alignItems: 'center', marginBottom: 25, padding: 20, backgroundColor: '#fff', borderRadius: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.07, shadowRadius: 8, elevation: 2 },
  profilePicContainer: { marginBottom: 15, position: 'relative' },
  profilePic: { width: 120, height: 120, borderRadius: 60, backgroundColor: '#ddd', borderWidth: 4, borderColor: '#fff' },
  email: { fontSize: 16, color: '#666' },
  quickStatsContainer: { width: '100%', backgroundColor: '#fff', borderRadius: 16, padding: 20, marginBottom: 25, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 10, elevation: 5 },
  titleContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  editIcon: { backgroundColor: '#4A90E2', width: 32, height: 32, borderRadius: 16, justifyContent: 'center', alignItems: 'center' },
  tabsContainer: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#f0f0f0', marginBottom: 15 },
  tab: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 10, paddingHorizontal: 5 },
  activeTab: { borderBottomWidth: 2, borderBottomColor: '#4A90E2' },
  tabText: { fontSize: 14, color: '#666', fontWeight: '500', marginLeft: 5 },
  activeTabText: { color: '#4A90E2', fontWeight: '600' },
  statsTabContent: { marginTop: 10 },
  statItem: { marginBottom: 24 },
  statHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  statLabel: { fontSize: 14, fontWeight: '600', color: '#666', marginLeft: 8, flex: 1 },
  statValue: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  progressBarContainer: { height: 8, backgroundColor: '#f0f0f0', borderRadius: 4, overflow: 'hidden', marginBottom: 6 },
  progressBar: { height: '100%', borderRadius: 4 },
  statContext: { fontSize: 12, color: '#999' },
  badgesContainer: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 10 },
  badge: { backgroundColor: '#FFF3E0', paddingVertical: 6, paddingHorizontal: 12, borderRadius: 20, marginRight: 8, marginBottom: 8 },
  badgeText: { color: '#E65100', fontSize: 12, fontWeight: '500' },
  tagsContainer: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 10 },
  tag: { backgroundColor: '#E8F5E9', paddingVertical: 4, paddingHorizontal: 10, borderRadius: 16, marginRight: 8, marginBottom: 8 },
  tagText: { color: '#2E7D32', fontSize: 12, fontWeight: '500' },
  leadershipContainer: { marginTop: 10 },
  leadershipItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 10, paddingVertical: 8, paddingHorizontal: 10, backgroundColor: '#FFF8E1', borderRadius: 8 },
  leadershipIcon: { marginRight: 10 },
  leadershipText: { fontSize: 14, color: '#333', fontWeight: '500' },
  actionButtonsContainer: { width: '100%', marginBottom: 30 },
  actionButton: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', padding: 16, marginBottom: 12, borderRadius: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 5, elevation: 2 },
  iconCircle: { width: 48, height: 48, borderRadius: 24, justifyContent: 'center', alignItems: 'center', marginRight: 16 },
  actionButtonText: { fontSize: 16, fontWeight: '600', color: '#333', flex: 1 },
  actionArrow: { marginLeft: 'auto' },
  logoutButton: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#4A90E2', paddingVertical: 16, paddingHorizontal: 30, borderRadius: 50, alignSelf: 'center', marginBottom: 30, shadowColor: '#4A90E2', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 5, elevation: 2 },
  logoutText: { color: '#4A90E2', fontSize: 16, fontWeight: '600' },
});

export default ProfileScreen; 