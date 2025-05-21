import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Image,
  FlatList
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

// Mock data for recommended colleges
const recommendedColleges = [
  {
    id: '1',
    name: 'Harvard University',
    location: 'Cambridge, MA',
    image: 'https://www.harvard.edu/wp-content/uploads/2020/10/042920_HarvardYard_058-1.jpg',
    acceptanceRate: '4%',
    matchScore: 95,
    reasons: [
      'Matches your GPA of 3.85',
      'Strong in Business programs',
      'Offers scholarships for academic achievers',
      'Has competitive debate team'
    ]
  },
  {
    id: '2',
    name: 'Stanford University',
    location: 'Stanford, CA',
    image: 'https://static01.nyt.com/images/2019/03/14/us/14stanford-1-print/14stanford-1-superJumbo.jpg',
    acceptanceRate: '4.3%',
    matchScore: 93,
    reasons: [
      'Top Computer Science program',
      'Strong athletic programs matching your interests',
      'Entrepreneurship opportunities',
      'Active student leadership opportunities'
    ]
  },
  {
    id: '3',
    name: 'MIT',
    location: 'Cambridge, MA',
    image: 'https://news.mit.edu/sites/default/files/styles/news_article__image_gallery/public/images/202010/MIT-Dome-Sunset-001.jpg',
    acceptanceRate: '6.7%',
    matchScore: 91,
    reasons: [
      'Leading Computer Science program',
      'SAT score aligns with accepted students',
      'Strong STEM focus',
      'Entrepreneurship ecosystem'
    ]
  },
  {
    id: '4',
    name: 'Rice University',
    location: 'Houston, TX',
    image: 'https://cdn.britannica.com/21/94521-050-58C37C10/Lovett-Hall-Rice-University-Houston-Texas.jpg',
    acceptanceRate: '9%',
    matchScore: 89,
    reasons: [
      'Strong academic programs',
      'Great soccer program',
      'Active student government',
      'Smaller class sizes'
    ]
  },
  {
    id: '5',
    name: 'Northwestern University',
    location: 'Evanston, IL',
    image: 'https://news.northwestern.edu/assets/Stories/2022/09/campus-beauty-1200-1200x675.jpg',
    acceptanceRate: '7.3%',
    matchScore: 88,
    reasons: [
      'Strong leadership development programs',
      'Excellent student body government',
      'Competitive debate team',
      'Matches your academic profile'
    ]
  },
  {
    id: '6',
    name: 'Carnegie Mellon University',
    location: 'Pittsburgh, PA',
    image: 'https://www.cmu.edu/news/stories/archives/2023/april/images/cmu-pittsburgh-campus-nik-5.jpg',
    acceptanceRate: '13.9%',
    matchScore: 87,
    reasons: [
      'World-renowned Computer Science programs',
      'Strong business school',
      'Entrepreneurship initiatives',
      'Tennis program you might enjoy'
    ]
  },
  {
    id: '7',
    name: 'UC Berkeley',
    location: 'Berkeley, CA',
    image: 'https://images.squarespace-cdn.com/content/v1/57ae2a8fcd0f682658b0df71/1586292714967-LPLC7R6ODJUUF8IS4NZ7/Berkeley-GS-Header.jpg',
    acceptanceRate: '14.4%',
    matchScore: 86,
    reasons: [
      'Excellent Computer Science department',
      'Strong athletic programs',
      'Leadership opportunities',
      'Match for your academic profile'
    ]
  },
  {
    id: '8',
    name: 'Duke University',
    location: 'Durham, NC',
    image: 'https://www.thoughtco.com/thmb/l9-7Y9FfiDdVDFJ31qIh2cL-Dqk=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/duke-university-chapel-56a49d495f9b58b7d0d78604.jpg',
    acceptanceRate: '6.8%',
    matchScore: 85,
    reasons: [
      'Strong academic programs',
      'Competitive soccer team',
      'Active student body government',
      'Offers merit scholarships'
    ]
  }
];

// Filter options
const filterOptions = [
  { id: 'best-match', label: 'Best Match' },
  { id: 'academic', label: 'Academic' },
  { id: 'athletic', label: 'Athletic' },
  { id: 'leadership', label: 'Leadership' }
];

const RecommendedCollegesScreen = () => {
  // State for active filter
  const [activeFilter, setActiveFilter] = useState('best-match');
  
  // Navigate back to profile
  const navigateBack = () => {
    router.back();
  };
  
  // Save college to favorites
  const saveToFavorites = (collegeId) => {
    // In a real app, this would update the state and possibly make an API call
    console.log(`Saving college ${collegeId} to favorites (Placeholder)`);
    // Here you would typically update the state of the specific item
    // For example, if you had a `colleges` state:
    // setColleges(prev => prev.map(c => c.id === collegeId ? {...c, isFavorited: !c.isFavorited} : c));
  };
  
  // View college details
  const viewCollegeDetails = (collegeId) => {
    router.push(`/college-profile?id=${collegeId}`);
  };
  
  // Render college card
  const renderCollegeCard = ({ item }) => (
    <View style={styles.cardOuterContainer}>
      <View style={styles.matchBadge}>
        <Text style={styles.matchBadgeText}>{item.matchScore}% Match</Text>
      </View>
      <View style={styles.collegeCard}>
        <View style={styles.cardHeader}>
          <View style={styles.collegeInfoMain}>
            <Text style={styles.collegeName}>{item.name}</Text>
            <Text style={styles.collegeLocation}>{item.location}</Text>
            <Text style={styles.acceptanceRateText}>Acceptance Rate: {item.acceptanceRate}</Text>
          </View>
          <TouchableOpacity 
            onPress={(e) => {
              e.stopPropagation();
              saveToFavorites(item.id);
            }}
            style={styles.favoriteIconContainer}
          >
            {/* Assuming you'll add a state for isFavorited per item */}
            <Ionicons name={"star-outline"} size={28} color="#888" />
          </TouchableOpacity>
        </View>
        
        <View style={styles.recommendationReasonsContainer}>
          <Text style={styles.recommendationTitle}>Why We Recommend This:</Text>
          {item.reasons.map((reason, index) => (
            <View key={index} style={styles.reasonItem}>
              <Ionicons name="checkmark-circle" size={18} color="#4CAF50" style={styles.reasonIcon} />
              <Text style={styles.reasonText}>{reason}</Text>
            </View>
          ))}
        </View>
        
        <TouchableOpacity 
          style={styles.viewDetailsButton}
          onPress={() => viewCollegeDetails(item.id)}
        >
          <Text style={styles.viewDetailsButtonText}>View Details</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.headerBackButton} onPress={navigateBack}>
          <Ionicons name="arrow-back" size={28} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerScreenTitle}>Recommended For You</Text>
        <View style={styles.headerBackButton} />{/* For spacing */}
      </View>
      
      {/* Filters */}
      <View style={styles.filtersMainContainer}>
        <FlatList
          data={filterOptions}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.filtersListContainer}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.filterChipBase,
                activeFilter === item.id ? styles.activeFilterChipStyle : styles.inactiveFilterChipStyle
              ]}
              onPress={() => setActiveFilter(item.id)}
            >
              <Text style={[
                styles.filterChipTextBase,
                activeFilter === item.id ? styles.activeFilterChipTextStyle : styles.inactiveFilterChipTextStyle
              ]}>
                {item.label}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>
      <Text style={styles.recommendationDescription}>
        Colleges recommended based on your GPA, SAT scores, leadership roles, and interests.
      </Text>
      
      {/* Recommended Colleges List */}
      <FlatList
        data={recommendedColleges}
        renderItem={renderCollegeCard}
        keyExtractor={item => item.id}
        style={styles.listContainer}
        contentContainerStyle={styles.listContentContainer}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    backgroundColor: '#F4F6F8', // Light grey background for the whole screen
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 12,
    backgroundColor: '#F4F6F8', // Match screen background
  },
  headerBackButton: {
    padding: 5,
    width: 30, // to balance the title
  },
  headerScreenTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  filtersMainContainer: {
    paddingVertical: 10,
    backgroundColor: '#F4F6F8',
  },
  filtersListContainer: {
    paddingHorizontal: 15,
  },
  filterChipBase: {
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 20,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeFilterChipStyle: {
    backgroundColor: '#F26B6B', // Reddish color for active
  },
  inactiveFilterChipStyle: {
    backgroundColor: '#EFEFF0', // Light gray for inactive
  },
  filterChipTextBase: {
    fontSize: 14,
    fontWeight: '500',
  },
  activeFilterChipTextStyle: {
    color: '#FFFFFF', // White text for active
  },
  inactiveFilterChipTextStyle: {
    color: '#555', // Darker gray text for inactive
  },
  recommendationDescription: {
    fontSize: 14,
    color: '#666',
    paddingHorizontal: 20,
    paddingBottom: 15,
    textAlign: 'left',
    backgroundColor: '#F4F6F8',
  },
  listContainer: {
    flex: 1,
  },
  listContentContainer: {
    paddingHorizontal: 15,
    paddingBottom: 20,
  },
  cardOuterContainer: {
    marginBottom: 20,
    position: 'relative', // For match badge positioning
  },
  collegeCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 5,
    elevation: 3,
  },
  matchBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#4A4A4A', // Dark gray badge
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    zIndex: 1, // Ensure badge is on top
  },
  matchBadgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start', // Align items to the start for multi-line text
    marginBottom: 12,
    paddingTop: 20, // To ensure content is below match badge
  },
  collegeInfoMain: {
    flex: 1, // Allows text to take available space and wrap
    marginRight: 10, // Space before favorite icon
  },
  collegeName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  collegeLocation: {
    fontSize: 14,
    color: '#777',
    marginBottom: 6,
  },
  acceptanceRateText: {
    fontSize: 13,
    color: '#777',
  },
  favoriteIconContainer: {
    padding: 5, // Easier to tap
  },
  recommendationReasonsContainer: {
    marginTop: 10,
    marginBottom: 15,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#ECECEC',
  },
  recommendationTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#444',
    marginBottom: 10,
  },
  reasonItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  reasonIcon: {
    marginRight: 8,
  },
  reasonText: {
    fontSize: 14,
    color: '#555',
    flexShrink: 1, // Allow text to wrap
  },
  viewDetailsButton: {
    backgroundColor: '#F26B6B', // Reddish button
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  viewDetailsButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },

  // Styles from the original file that might need review or were placeholders
  // Keeping them for reference in case they were used by parts not touched
  // or if specific elements (like image) are re-introduced.
  container: { // Original top container
    flex: 1,
    backgroundColor: '#fff',
  },
  header: { // Original header
    // ... (kept for reference)
  },
  backButton: { // Original back button
     // ... (kept for reference)
  },
  headerTitle: { // Original header title
     // ... (kept for reference)
  },
  filtersContainer: { // Original filters container
     // ... (kept for reference)
  },
  filtersList: { // Original filters list
     // ... (kept for reference)
  },
  filterChip: { // Original filter chip
     // ... (kept for reference)
  },
  activeFilterChip: { // Original active filter chip
     // ... (kept for reference)
  },
  filterText: { // Original filter text
     // ... (kept for reference)
  },
  activeFilterText: { // Original active filter text
     // ... (kept for reference)
  },
  // collegeCard: { // Original card style, significantly changed
  //   // ...
  // },
  collegeImage: { // If you re-add images to cards
    width: '100%',
    height: 150, // Or dynamic height
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    marginBottom: 10, // If image is above text content
  },
  // matchBadge: { // Original match badge, now restyled
  //   // ...
  // },
  // matchText: { // Original match text, now matchBadgeText
  //   // ...
  // },
  collegeInfo: { // Original info container within card
    // padding: 15,
  },
  nameContainer: { // Original name container
    // flexDirection: 'row',
    // justifyContent: 'space-between',
    // alignItems: 'center',
    // marginBottom: 8,
  },
  // collegeName: { // Original college name, now restyled
  //   // ...
  // },
  favoriteButton: { // Original favorite button, now favoriteIconContainer
    // padding: 5,
  },
  // collegeLocation: { // Original location, now restyled
  //   // ...
  // },
  statsContainer: { // Original stats container
    // flexDirection: 'row',
    // justifyContent: 'space-around',
    // marginVertical: 10,
  },
  statItem: { // Original stat item
    // alignItems: 'center',
  },
  statLabel: { // Original stat label
    // fontSize: 12,
    // color: '#888',
  },
  statValue: { // Original stat value
    // fontSize: 14,
    // fontWeight: 'bold',
    // color: '#333',
  },
  reasonsContainer: { // Original reasons container
    // marginTop: 10,
  },
  reasonsTitle: { // Original reasons title
    // fontSize: 14,
    // fontWeight: '600',
    // color: '#555',
    // marginBottom: 5,
  },
  // reasonItem: { // Original reason item
  //   // ...
  // },
  // reasonText: { // Original reason text
  //   // ...
  // },
  // viewDetailsButton: { // Original view details button
  //   // ...
  // },
  // viewDetailsText: { // Original view details text
  //   // ...
  // },
  emptyStateContainer: { // For when the list is empty
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  emptyStateText: {
    fontSize: 18,
    color: '#999',
    marginTop: 10,
  }
});

export default RecommendedCollegesScreen; 