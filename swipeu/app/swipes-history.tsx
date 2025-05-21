import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Image,
  FlatList,
  Animated,
  Dimensions
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

// Mock data for colleges
const collegesData = [
  {
    id: '1',
    name: 'Harvard University',
    location: 'Cambridge, MA',
    image: 'https://www.harvard.edu/wp-content/uploads/2020/10/042920_HarvardYard_058-1.jpg',
    acceptanceRate: '4%',
    ranking: '#1',
    tuition: '$55k',
    liked: true,
    passed: false,
    favorited: true
  },
  {
    id: '2',
    name: 'Stanford University',
    location: 'Stanford, CA',
    image: 'https://static01.nyt.com/images/2019/03/14/us/14stanford-1-print/14stanford-1-superJumbo.jpg',
    acceptanceRate: '4.3%',
    ranking: '#2',
    tuition: '$57k',
    liked: true,
    passed: false,
    favorited: true
  },
  {
    id: '3',
    name: 'MIT',
    location: 'Cambridge, MA',
    image: 'https://news.mit.edu/sites/default/files/styles/news_article__image_gallery/public/images/202010/MIT-Dome-Sunset-001.jpg',
    acceptanceRate: '6.7%',
    ranking: '#3',
    tuition: '$58k',
    liked: true,
    passed: false,
    favorited: false
  },
  {
    id: '4',
    name: 'Yale University',
    location: 'New Haven, CT',
    image: 'https://i0.wp.com/yaledailynews.com/wp-content/uploads/2020/03/oldcampus.jpg',
    acceptanceRate: '6.1%',
    ranking: '#4',
    tuition: '$59k',
    liked: false,
    passed: true,
    favorited: false
  },
  {
    id: '5',
    name: 'Princeton University',
    location: 'Princeton, NJ',
    image: 'https://www.princeton.edu/sites/default/files/styles/scale_1440/public/images/2022/02/20220202_CampusSnow_DJA_025.jpg',
    acceptanceRate: '5.8%',
    liked: true,
    passed: false,
    favorited: false
  },
  {
    id: '6',
    name: 'Columbia University',
    location: 'New York, NY',
    image: 'https://www.columbia.edu/content/sites/default/files/styles/cu_crop/public/content/Morningside%20Campus%20at%20Dusk%202.jpg',
    acceptanceRate: '5.5%',
    liked: false,
    passed: true,
    favorited: false
  },
  {
    id: '7',
    name: 'Cornell University',
    location: 'Ithaca, NY',
    image: 'https://www.cornell.edu/sites/default/files/2021-03/campus-scenic-banner-summer-trees-arts-quad.jpg',
    acceptanceRate: '10.6%',
    liked: true,
    passed: false,
    favorited: true
  },
  {
    id: '8',
    name: 'Brown University',
    location: 'Providence, RI',
    image: 'https://www.brown.edu/sites/default/files/styles/wide_med/public/2020-10/20180930_080_1.jpg',
    acceptanceRate: '7.1%',
    liked: false,
    passed: true,
    favorited: false
  }
];

const { width } = Dimensions.get('window');

// Define CollegeCardItem as a separate component
const CollegeCardItem = ({ item, index, onFavoriteToggle, onViewDetails }: { 
  item: typeof collegesData[0], 
  index: number, 
  onFavoriteToggle: (id: string) => void,
  onViewDetails: (id: string) => void
}) => {
  const cardSlideAnim = useRef(new Animated.Value(30)).current;
  const cardFadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(cardSlideAnim, {
      toValue: 0,
      duration: 300,
      delay: index * 100,
      useNativeDriver: true,
    }).start();
    Animated.timing(cardFadeAnim, {
      toValue: 1,
      duration: 300,
      delay: index * 100,
      useNativeDriver: true,
    }).start();
  }, [cardSlideAnim, cardFadeAnim, index]);
  
  let statusText = "";
  let statusIcon = "";
  let statusColor = "#666";

  if (item.liked && !item.passed) {
      statusText = "Liked";
      statusIcon = "heart";
      statusColor = "#FF6B6B";
  } else if (item.passed && !item.liked) {
      statusText = "Passed";
      statusIcon = "close-circle";
      statusColor = "#888";
  }

  return (
    <Animated.View style={{ opacity: cardFadeAnim, transform: [{ translateY: cardSlideAnim }] }}>
      <TouchableOpacity 
        style={styles.collegeCard}
        onPress={() => onViewDetails(item.id)}
        activeOpacity={0.8}
      >
        <Image source={{ uri: item.image }} style={styles.collegeImage} />
        <View style={styles.cardOverlay} />
        
        <View style={styles.collegeInfoTop}>
          <View style={styles.collegeNameLocation}>
            <Text style={styles.collegeName}>{item.name}</Text>
            <Text style={styles.collegeLocation}>{item.location}</Text>
          </View>
          <TouchableOpacity 
            onPress={(e) => {
              e.stopPropagation();
              onFavoriteToggle(item.id);
            }}
            style={styles.favoriteButton}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons 
              name={item.favorited ? "star" : "star-outline"} 
              size={26} 
              color={item.favorited ? "#FFD700" : "#fff"} 
            />
          </TouchableOpacity>
        </View>

        <View style={styles.collegeInfoBottom}>
          <View style={styles.statPill}>
            <Ionicons name="checkmark-circle-outline" size={14} color="#4CAF50" />
            <Text style={styles.statPillText}>Rate: {item.acceptanceRate}</Text>
          </View>
           <View style={styles.statPill}>
            <Ionicons name="trending-up-outline" size={14} color="#2196F3" />
            <Text style={styles.statPillText}>Rank: {item.ranking}</Text>
          </View>
          <View style={styles.statPill}>
            <Ionicons name="cash-outline" size={14} color="#FF9800" />
            <Text style={styles.statPillText}>Tuition: {item.tuition}</Text>
          </View>
          {statusText ? (
            <View style={[styles.actionIndicator, { backgroundColor: statusColor + '20'}]}>
              <Ionicons 
                name={statusIcon as any} 
                size={16} 
                color={statusColor} 
              />
              <Text style={[styles.actionText, { color: statusColor }]}>
                {statusText}
              </Text>
            </View>
          ) : null}
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const SwipesHistoryScreen = () => {
  // State for active tab
  const [activeTab, setActiveTab] = useState('liked');
  const [colleges, setColleges] = useState(collegesData); // To allow modification for favorite toggle
  
  // Animation
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;
  
  useEffect(() => {
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
  
  // Filter colleges based on active tab
  const getFilteredColleges = () => {
    switch (activeTab) {
      case 'liked':
        return colleges.filter(college => college.liked && !college.passed);
      case 'passed':
        return colleges.filter(college => college.passed && !college.liked);
      case 'favorites':
        return colleges.filter(college => college.favorited);
      default:
        return [];
    }
  };
  
  // Navigate back to the profile
  const navigateBack = () => {
    router.back();
  };
  
  // Toggle favorite status
  const toggleFavorite = (collegeId: string) => {
    setColleges(prevColleges => 
      prevColleges.map(college => 
        college.id === collegeId ? { ...college, favorited: !college.favorited } : college
      )
    );
    // In a real app, update backend as well
  };
  
  // View college details
  const viewCollegeDetails = (collegeId: string) => {
    router.push(`/college-profile?id=${collegeId}`);
  };
  
  // Updated renderItem for FlatList
  const renderItem = ({ item, index }: { item: typeof collegesData[0], index: number }) => (
    <CollegeCardItem 
      item={item} 
      index={index} 
      onFavoriteToggle={toggleFavorite}
      onViewDetails={viewCollegeDetails}
    />
  );

  const tabs = [
    { key: 'liked', label: 'Liked', icon: 'heart' },
    { key: 'passed', label: 'Passed', icon: 'close-circle' },
    { key: 'favorites', label: 'Favorites', icon: 'star' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={navigateBack}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Your Swipes</Text>
        <View style={styles.backButton} />
      </View>
      
      {/* Tabs */}
      <View style={styles.tabContainer}>
        {tabs.map(tab => (
          <TouchableOpacity 
            key={tab.key}
            style={[
              styles.tab, 
              activeTab === tab.key && styles.activeTab
            ]}
            onPress={() => setActiveTab(tab.key)}
          >
            <Ionicons 
              name={tab.icon as any}
              size={20} 
              color={activeTab === tab.key ? "#FF6B6B" : "#888"} 
            />
            <Text style={[
              styles.tabText,
              activeTab === tab.key && styles.activeTabText
            ]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      
      {/* College List */}
      <Animated.View style={[styles.listContainer, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
        <FlatList
          data={getFilteredColleges()}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContentContainer}
          ListEmptyComponent={
            <View style={styles.emptyStateContainer}>
              <MaterialCommunityIcons name="compass-off-outline" size={60} color="#ccc" />
              <Text style={styles.emptyStateText}>No colleges found in this list.</Text>
              <Text style={styles.emptyStateSubText}>Keep swiping to build your history!</Text>
            </View>
          }
        />
      </Animated.View>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e8e8e8',
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
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingVertical: 8,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: '#FF6B6B',
  },
  tabText: {
    marginLeft: 5,
    color: '#999',
    fontWeight: '500',
  },
  activeTabText: {
    color: '#FF6B6B',
  },
  listContainer: {
    flex: 1,
  },
  listContentContainer: {
    padding: 15,
    paddingBottom: 40,
  },
  collegeCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    overflow: 'hidden',
    height: width * 0.6,
    justifyContent: 'flex-end',
  },
  collegeImage: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
  },
  cardOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  collegeInfoTop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    zIndex: 1,
  },
  collegeNameLocation: {
    flex: 1,
  },
  collegeName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 2,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  collegeLocation: {
    fontSize: 14,
    color: '#eee',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  favoriteButton: {
    padding: 6,
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderRadius: 20,
  },
  collegeInfoBottom: {
    padding: 12,
    backgroundColor: 'rgba(0,0,0,0.4)',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    zIndex: 1,
  },
  statPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 12,
    paddingVertical: 4,
    paddingHorizontal: 8,
    marginRight: 6,
    marginBottom: 6,
  },
  statPillText: {
    fontSize: 11,
    color: '#fff',
    fontWeight: '500',
    marginLeft: 4,
  },
  actionIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
    marginLeft: 'auto',
  },
  actionText: {
    marginLeft: 6,
    fontSize: 12,
    fontWeight: 'bold',
  },
  emptyStateContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  emptyStateText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#666',
    marginTop: 16,
  },
  emptyStateSubText: {
    fontSize: 14,
    color: '#999',
    marginTop: 8,
    textAlign: 'center',
    paddingHorizontal: 30,
  }
});

export default SwipesHistoryScreen; 