import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  FlatList,
  TextInput,
  Dimensions,
  Modal,
  Alert,
  Animated,
  SectionList,
  ScrollView,
  LayoutAnimation,
  Platform,
  UIManager,
  Easing
} from 'react-native';
import { Ionicons, MaterialCommunityIcons, FontAwesome5, Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

// Enable layout animations for Android
if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

// Mock data for colleges
const collegesData = [
  {
    id: '1',
    name: 'Harvard University',
    logo: 'https://1000logos.net/wp-content/uploads/2017/02/Harvard-Logo.png',
    membersCount: 1243,
    color: '#A51C30'
  },
  {
    id: '2',
    name: 'Stanford University',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Stanford_Cardinal_logo.svg/1200px-Stanford_Cardinal_logo.svg.png',
    membersCount: 987,
    color: '#8C1515'
  },
  {
    id: '3',
    name: 'MIT',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/MIT_logo.svg/1200px-MIT_logo.svg.png',
    membersCount: 876,
    color: '#A31F34'
  },
  {
    id: '4',
    name: 'Yale University',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Yale_University_logo.svg/1200px-Yale_University_logo.svg.png',
    membersCount: 763,
    color: '#0F4D92'
  },
  {
    id: '5',
    name: 'Princeton University',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Princeton_seal.svg/1200px-Princeton_seal.svg.png',
    membersCount: 651,
    color: '#FF8F00'
  },
  {
    id: '6',
    name: 'Columbia University',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Columbia_University_shield.svg/1200px-Columbia_University_shield.svg.png',
    membersCount: 542,
    color: '#4F8FE3'
  },
  {
    id: '7',
    name: 'Cornell University',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Cornell_University_seal.svg/1200px-Cornell_University_seal.svg.png',
    membersCount: 438,
    color: '#B31B1B'
  },
  {
    id: '8',
    name: 'Brown University',
    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/3/31/Brown_University_coat_of_arms.svg/1200px-Brown_University_coat_of_arms.svg.png',
    membersCount: 329,
    color: '#4E3629'
  },
  {
    id: '9',
    name: 'Duke University',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Duke_Athletics_logo.svg/1200px-Duke_Athletics_logo.svg.png',
    membersCount: 287,
    color: '#00539B'
  },
  {
    id: '10',
    name: 'University of Chicago',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Uchicago_shield.svg/1200px-Uchicago_shield.svg.png',
    membersCount: 265,
    color: '#800000'
  },
  {
    id: '11',
    name: 'UC Berkeley',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Seal_of_University_of_California%2C_Berkeley.svg/1200px-Seal_of_University_of_California%2C_Berkeley.svg.png',
    membersCount: 432,
    color: '#003262'
  },
  {
    id: '12',
    name: 'NYU',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/NYU_Tandon_School_of_Engineering_logo.svg/1200px-NYU_Tandon_School_of_Engineering_logo.svg.png',
    membersCount: 356,
    color: '#57068c'
  },
  {
    id: '13',
    name: 'UCLA',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/The_University_of_California_UCLA.svg/1200px-The_University_of_California_UCLA.svg.png',
    membersCount: 298,
    color: '#2774AE'
  },
  {
    id: '14',
    name: 'UPenn',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/UPenn_shield_with_banner.svg/1200px-UPenn_shield_with_banner.svg.png',
    membersCount: 253,
    color: '#011F5B'
  },
  {
    id: '15',
    name: 'Northwestern University',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Northwestern_Wildcats_logo.svg/1200px-Northwestern_Wildcats_logo.svg.png',
    membersCount: 218,
    color: '#4E2A84'
  },
  {
    id: '16',
    name: 'Rice University',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Rice_Owls_logo.svg/1200px-Rice_Owls_logo.svg.png',
    membersCount: 185,
    color: '#00205B'
  }
];

const CommunitiesScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('mostPopular'); // 'mostPopular' or 'leastPopular'
  const [joinedCommunities, setJoinedCommunities] = useState([]);
  const [otherCommunities, setOtherCommunities] = useState([]);
  const [selectedCollege, setSelectedCollege] = useState(null);
      const [joinModalVisible, setJoinModalVisible] = useState(false);
    const [colleges, setColleges] = useState(collegesData);
    const [satScore, setSatScore] = useState('1480');
    const [actScore, setActScore] = useState('');
  
  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;
  const searchBarAnim = useRef(new Animated.Value(0)).current;
  const headerOpacityAnim = useRef(new Animated.Value(0)).current;
  const sortBtnAnim = useRef({
    mostPopular: new Animated.Value(1),
    leastPopular: new Animated.Value(0)
  }).current;
  
  const screenWidth = Dimensions.get('window').width;
  
  // Calculate number of columns based on screen width
  const numColumns = screenWidth >= 768 ? 4 : 3;

  // Animate component on mount
  useEffect(() => {
    Animated.stagger(150, [
      Animated.timing(headerOpacityAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(searchBarAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      })
    ]).start();

    // Custom layout animation for list items
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  }, []);

  // Initialize communities on mount
  useEffect(() => {
    // First filter by search query
    let filtered = collegesData.filter(college => 
      college.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    // Then sort by popularity
    if (sortBy === 'mostPopular') {
      filtered.sort((a, b) => b.membersCount - a.membersCount);
    } else {
      filtered.sort((a, b) => a.membersCount - b.membersCount);
    }
    
    // Separate joined and other communities
    const others = filtered.filter(college => 
      !joinedCommunities.includes(college.id)
    );
    
    setOtherCommunities(others);
    setColleges(filtered);
    
    // Animate sort button changes
    Animated.parallel([
      Animated.timing(sortBtnAnim.mostPopular, {
        toValue: sortBy === 'mostPopular' ? 1 : 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(sortBtnAnim.leastPopular, {
        toValue: sortBy === 'leastPopular' ? 1 : 0,
        duration: 200,
        useNativeDriver: true,
      })
    ]).start();
    
    // Custom layout animation for list updates
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  }, [searchQuery, sortBy, joinedCommunities]);

  
  // Navigate back to profile
  const navigateBack = () => {
    router.back();
  };
  
  // Handle college tap
  const handleCollegeTap = (college) => {
    if (joinedCommunities.includes(college.id)) {
      // If already joined, navigate directly to community page
      navigateToCommunity(college.id);
    } else {
      // If not joined, show join prompt
      setSelectedCollege(college);
      setJoinModalVisible(true);
      
      // Reset animation values
      fadeAnim.setValue(0);
      scaleAnim.setValue(0.9);
      
      // Animate modal appearance
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          friction: 8,
          useNativeDriver: true,
        })
      ]).start();
    }
  };
  
  // Navigate to a college community
  const navigateToCommunity = (collegeId) => {
    router.push({
      pathname: '/college-community',
      params: { id: collegeId }
    });
  };
  
  // Join community
  const joinCommunity = () => {
    if (selectedCollege) {
      // Add to joined communities
      setJoinedCommunities(prev => [...prev, selectedCollege.id]);
      
      // Update member count in collegesData
      const updatedCollegeData = collegesData.map(college => {
        if (college.id === selectedCollege.id) {
          return {
            ...college,
            membersCount: college.membersCount + 1
          };
        }
        return college;
      });
      
      // Close modal and navigate to community
      setJoinModalVisible(false);
      navigateToCommunity(selectedCollege.id);
    }
  };
  
  // Decline join
  const declineJoin = () => {
    setJoinModalVisible(false);
  };
  
  // Clear search query
  const clearSearch = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setSearchQuery('');
  };
  
  // Toggle sort method
  const toggleSortMethod = (method) => {
    if (method !== sortBy) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setSortBy(method);
    }
  };
  
  // Render college item
  const renderCollegeItem = ({ item, index }) => {
    const isJoined = joinedCommunities.includes(item.id);
    const itemColor = item.color || '#FF6B6B';
    
    // Calculate staggered animation delay for each item
    const delay = index * 50;
    
    return (
      <Animated.View
        style={{
          opacity: 1,
          transform: [{ 
            translateY: 0
          }]
        }}
      >
        <TouchableOpacity 
          style={[styles.collegeItem, isJoined && styles.joinedCollegeItem]}
          onPress={() => handleCollegeTap(item)}
          activeOpacity={0.8}
        >
          <View style={styles.logoContainer}>
            <LinearGradient
              colors={['rgba(255,255,255,0.8)', 'rgba(255,255,255,1)']}
              style={styles.logoGradient}
            />
            <Image source={{ uri: item.logo }} style={styles.collegeLogo} />
          </View>
          <Text style={styles.collegeName} numberOfLines={2} ellipsizeMode="tail">
            {item.name}
          </Text>
          <View style={styles.memberCountContainer}>
            <Text style={styles.memberCount}>
              {item.membersCount.toLocaleString()} members
            </Text>
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  // Render section header
  const renderSectionHeader = ({ section }) => {
    const isJoinedSection = section.title.includes('Joined');
    const icon = isJoinedSection ? 'star' : 'school';
    
    return (
      <View style={styles.sectionHeader}>
        <LinearGradient
          colors={isJoinedSection ? 
            ['#4A90E220', '#4A90E210', 'transparent'] : 
            ['#4285F420', '#4285F410', 'transparent']}
          start={[0, 0]}
          end={[1, 0]}
          style={styles.sectionGradient}
        />
        <View style={styles.sectionIconContainer}>
          <MaterialCommunityIcons 
            name={icon} 
            size={20} 
            color={isJoinedSection ? '#4A90E2' : '#4285F4'} 
          />
        </View>
        <Text style={[
          styles.sectionTitle,
          isJoinedSection && {color: '#4A90E2'}
        ]}>
          {section.title}
        </Text>
        {section.data.length > 0 && (
          <View style={[
            styles.sectionCountContainer,
            isJoinedSection && {backgroundColor: '#4A90E220'}
          ]}>
            <Text style={[
              styles.sectionCount,
              isJoinedSection && {color: '#4A90E2'}
            ]}>
              {section.data.length}
            </Text>
          </View>
        )}
      </View>
    );
  };

  // Create sections data
  const sections = [
    {
      title: 'Communities You\'ve Joined',
      data: joinedCommunities.length > 0 
        ? colleges.filter(college => joinedCommunities.includes(college.id))
        : []
    },
    {
      title: 'All Other Communities',
      data: otherCommunities
    }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header with Gradient */}
      <LinearGradient
        colors={['#ffffff', '#f8f9fa']}
        style={styles.headerGradient}
      >
        <Animated.View 
          style={[
            styles.header,
            {opacity: headerOpacityAnim}
          ]}
        >
          <TouchableOpacity style={styles.backButton} onPress={navigateBack}>
            <Ionicons name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Communities</Text>
          <View style={styles.backButton} />
        </Animated.View>
      </LinearGradient>
      
      {/* Search and Filter Bar */}
      <View style={styles.searchContainer}>
        <Animated.View 
          style={[
            styles.searchBarContainer,
            {
              opacity: searchBarAnim,
              transform: [{ translateY: searchBarAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [10, 0]
              })}]
            }
          ]}
        >
          <View style={styles.searchBar}>
            <Ionicons name="search" size={20} color="#999" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search for a college..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              clearButtonMode="while-editing"
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={clearSearch} style={styles.clearButton}>
                <Ionicons name="close-circle" size={20} color="#999" />
              </TouchableOpacity>
            )}
          </View>
        </Animated.View>
        
        {/* Filter options */}
        <Animated.View 
          style={[
            styles.filterContainer,
            {
              opacity: searchBarAnim,
              transform: [{ translateY: searchBarAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [10, 0]
              })}]
            }
          ]}
        >
          <Text style={styles.filterLabel}>Sort by:</Text>
          
          <View style={styles.filterOptionsContainer}>
            <TouchableOpacity 
              style={styles.filterOptionWrapper}
              onPress={() => toggleSortMethod('mostPopular')}
              activeOpacity={0.8}
            >
              <Animated.View 
                style={[
                  styles.filterOption,
                  {
                    backgroundColor: sortBtnAnim.mostPopular.interpolate({
                      inputRange: [0, 1],
                      outputRange: ['#f0f0f0', '#4A90E2']
                    })
                  }
                ]}
              >
                <Feather 
                  name="trending-up" 
                  size={14} 
                  color={sortBy === 'mostPopular' ? '#fff' : '#666'} 
                  style={styles.filterIcon}
                />
                <Animated.Text 
                  style={[
                    styles.filterText,
                    {
                      color: sortBtnAnim.mostPopular.interpolate({
                        inputRange: [0, 1],
                        outputRange: ['#666', '#fff']
                      })
                    }
                  ]}
                >
                  Most Popular
                </Animated.Text>
              </Animated.View>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.filterOptionWrapper}
              onPress={() => toggleSortMethod('leastPopular')}
              activeOpacity={0.8}
            >
              <Animated.View 
                style={[
                  styles.filterOption,
                  {
                    backgroundColor: sortBtnAnim.leastPopular.interpolate({
                      inputRange: [0, 1],
                      outputRange: ['#f0f0f0', '#4A90E2']
                    })
                  }
                ]}
              >
                <Feather 
                  name="trending-down" 
                  size={14} 
                  color={sortBy === 'leastPopular' ? '#fff' : '#666'} 
                  style={styles.filterIcon}
                />
                <Animated.Text 
                  style={[
                    styles.filterText,
                    {
                      color: sortBtnAnim.leastPopular.interpolate({
                        inputRange: [0, 1],
                        outputRange: ['#666', '#fff']
                      })
                    }
                  ]}
                >
                  Least Popular
                </Animated.Text>
              </Animated.View>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
      
      {/* Custom grid rendering for sections */}
      <ScrollView
        contentContainerStyle={styles.collegeGrid}
        showsVerticalScrollIndicator={false}
      >
        {sections.map((section) => (
          <View key={section.title} style={styles.section}>
            {/* Section Header */}
            <View style={styles.sectionHeader}>
              <LinearGradient
                colors={section.title.includes('Joined') ? 
                  ['#4A90E220', '#4A90E210', 'transparent'] : 
                  ['#4285F420', '#4285F410', 'transparent']}
                start={[0, 0]}
                end={[1, 0]}
                style={styles.sectionGradient}
              />
              <View style={styles.sectionIconContainer}>
                <MaterialCommunityIcons 
                  name={section.title.includes('Joined') ? 'star' : 'school'} 
                  size={20} 
                  color={section.title.includes('Joined') ? '#4A90E2' : '#4285F4'} 
                />
              </View>
              <Text style={[
                styles.sectionTitle,
                section.title.includes('Joined') && {color: '#4A90E2'}
              ]}>
                {section.title}
              </Text>
              {section.data.length > 0 && (
                <View style={[
                  styles.sectionCountContainer,
                  section.title.includes('Joined') && {backgroundColor: '#4A90E220'}
                ]}>
                  <Text style={[
                    styles.sectionCount,
                    section.title.includes('Joined') && {color: '#4A90E2'}
                  ]}>
                    {section.data.length}
                  </Text>
                </View>
              )}
            </View>
            
            {/* Grid items */}
            {section.data.length > 0 ? (
              <View style={styles.collegesRow}>
                {section.data.map((item, index) => {
                  const isJoined = joinedCommunities.includes(item.id);
                  const itemColor = item.color || '#4A90E2';
                  
                  return (
                    <Animated.View
                      key={item.id}
                      style={{
                        opacity: 1,
                        transform: [{ translateY: 0 }],
                        width: '31%',
                        marginBottom: 16,
                        marginHorizontal: '1%'
                      }}
                    >
                      <TouchableOpacity 
                        style={[styles.collegeItem, isJoined && styles.joinedCollegeItem]}
                        onPress={() => handleCollegeTap(item)}
                        activeOpacity={0.8}
                      >
                        <View style={styles.logoContainer}>
                          <LinearGradient
                            colors={['rgba(255,255,255,0.8)', 'rgba(255,255,255,1)']}
                            style={styles.logoGradient}
                          />
                          <Image source={{ uri: item.logo }} style={styles.collegeLogo} />
                        </View>
                        <Text style={styles.collegeName} numberOfLines={2} ellipsizeMode="tail">
                          {item.name}
                        </Text>
                        <View style={styles.memberCountContainer}>
                          <Text style={styles.memberCount}>
                            {item.membersCount.toLocaleString()} members
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </Animated.View>
                  );
                })}
              </View>
            ) : (
              section.title.includes('Joined') && (
                <View style={styles.emptyJoinedContainer}>
                  <Text style={styles.emptyJoinedText}>No communities joined yet</Text>
                  <Text style={styles.emptyJoinedSubtext}>Join a community to see it here</Text>
                </View>
              )
            )}
          </View>
        ))}
        
        {colleges.length === 0 && (
          <View style={styles.emptyContainer}>
            <Ionicons name="school-outline" size={60} color="#ccc" />
            <Text style={styles.emptyText}>No colleges found</Text>
            <Text style={styles.emptySubtext}>
              Try a different search term
            </Text>
          </View>
        )}
      </ScrollView>
      
      {/* Join Community Modal */}
      <Modal
        visible={joinModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={declineJoin}
      >
        <View style={styles.modalOverlay}>
          <Animated.View 
            style={[
              styles.modalContainer,
              {
                opacity: fadeAnim,
                transform: [{ scale: scaleAnim }]
              }
            ]}
          >
            {selectedCollege && (
              <>
                <LinearGradient
                  colors={['#4A90E210', '#f8f9fa']}
                  style={styles.modalGradient}
                />
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>Join Community</Text>
                </View>
                
                <View style={styles.modalBody}>
                  <View style={styles.modalLogoContainer}>
                    <LinearGradient
                      colors={['rgba(255,255,255,0.8)', 'rgba(255,255,255,1)']}
                      style={styles.logoGradient}
                    />
                    <Image 
                      source={{ uri: selectedCollege.logo }} 
                      style={styles.modalLogo} 
                    />
                  </View>
                  
                  <Text style={styles.modalCollegeName}>{selectedCollege.name}</Text>
                  
                  <Text style={styles.modalPrompt}>
                    Do you want to join this community?
                  </Text>
                </View>
                
                <View style={styles.modalActions}>
                  <TouchableOpacity 
                    style={[styles.modalButton, styles.declineButton]} 
                    onPress={declineJoin}
                    activeOpacity={0.8}
                  >
                    <Text style={styles.declineButtonText}>No</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity 
                    style={[styles.modalButton, styles.joinButton]} 
                    onPress={joinCommunity}
                    activeOpacity={0.8}
                  >
                    <LinearGradient
                      colors={['#4A90E2', '#6AB0FF']}
                      start={[0, 0]}
                      end={[1, 0]}
                      style={styles.joinButtonGradient}
                    >
                      <Text style={styles.joinButtonText}>Yes</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </Animated.View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  headerGradient: {
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  backButton: {
    padding: 5,
    width: 40,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  searchContainer: {
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    backgroundColor: '#fff',
  },
  searchBarContainer: {
    marginBottom: 12,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 46,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    paddingVertical: 8,
  },
  clearButton: {
    padding: 5,
  },
  // Filter styles
  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  filterLabel: {
    fontSize: 14,
    color: '#666',
    marginRight: 10,
    fontWeight: '500',
  },
  filterOptionsContainer: {
    flexDirection: 'row',
    flex: 1,
  },
  filterOptionWrapper: {
    marginRight: 8,
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  filterOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
  },
  filterIcon: {
    marginRight: 6,
  },
  filterText: {
    fontSize: 13,
    fontWeight: '600',
  },
  collegeGrid: {
    padding: 12,
    paddingBottom: 30,
  },
  section: {
    marginBottom: 20,
  },
  collegesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginTop: 10,
  },
  collegeItem: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 10,
    paddingBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
    height: 180, // Fixed height for consistent layout
  },
  joinedCollegeItem: {
    borderWidth: 2,
    borderColor: '#4A90E215',
    backgroundColor: '#FFFDFD',
  },
  logoContainer: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    marginVertical: 6,
    position: 'relative',
    overflow: 'hidden',
  },
  logoGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 38,
  },
  collegeLogo: {
    width: 58,
    height: 58,
    resizeMode: 'contain',
  },
  collegeName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 4,
    height: 36,
    width: '100%',
  },
  memberCountContainer: {
    backgroundColor: '#f8f9fa',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 10,
    marginTop: 2,
  },
  memberCount: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    fontWeight: '500',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#666',
    marginTop: 15,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999',
    marginTop: 8,
  },
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    backdropFilter: 'blur(3px)',
  },
  modalGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 16,
  },
  modalContainer: {
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 5,
  },
  modalHeader: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  modalBody: {
    padding: 20,
    alignItems: 'center',
  },
  modalLogoContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginBottom: 18,
    overflow: 'hidden',
  },
  modalLogo: {
    width: 76,
    height: 76,
    resizeMode: 'contain',
  },
  modalCollegeName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
    textAlign: 'center',
    marginBottom: 16,
  },
  modalPrompt: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
  },
  modalActions: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  modalButton: {
    flex: 1,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
  },
  declineButton: {
    backgroundColor: '#f8f9fa',
    borderRightWidth: 0.5,
    borderRightColor: '#e0e0e0',
  },
  joinButton: {
    backgroundColor: '#f8f9fa',
    borderLeftWidth: 0.5,
    borderLeftColor: '#e0e0e0',
    overflow: 'hidden',
  },
  joinButtonGradient: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  declineButtonText: {
    color: '#666',
    fontSize: 16,
    fontWeight: '600',
  },
  joinButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  emptyJoinedContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F0F7FF',
    borderRadius: 12,
    padding: 20,
    marginTop: 10,
    marginBottom: 10,
  },
  emptyJoinedText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#4A90E2',
    marginBottom: 5,
  },
  emptyJoinedSubtext: {
    fontSize: 13,
    color: '#999',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 8,
    marginBottom: 12,
    marginTop: 8,
    position: 'relative',
  },
  sectionGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  sectionIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#333',
    flex: 1,
  },
  sectionCountContainer: {
    minWidth: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  sectionCount: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  testTypeContainer: {
    marginBottom: 20,
    marginTop: 5,
  },
  testTypeLabel: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
    fontWeight: '500',
  },
  testTypeToggle: {
    flexDirection: 'row',
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    padding: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 1,
  },
  testTypeButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 2,
  },
  testTypeButtonActive: {
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 2,
  },
  testTypeText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#999',
  },
  testTypeTextActive: {
    color: '#4A90E2',
  },
  testScoreLabel: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
    fontWeight: '500',
  },
  academicInput: {
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    color: '#333',
    marginBottom: 16,
  },
  gpaLabel: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
    fontWeight: '500',
  },
});

export default CommunitiesScreen; 