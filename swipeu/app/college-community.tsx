import React, { useState, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  FlatList,
  Dimensions,
  Modal,
  TextInput,
  ScrollView,
  Platform,
  Alert,
  KeyboardAvoidingView,
  Animated
} from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
const Image1 = require('../assets/images/1.png');
const Image2 = require('../assets/images/2.png');

// Mock data for colleges
const collegeProfiles: { [key: string]: any } = {
  '1': {
    id: '1',
    name: 'Harvard University',
    username: 'harvard.2028class',
    logo: 'https://1000logos.net/wp-content/uploads/2017/02/Harvard-Logo.png',
    bio: 'Official community for Harvard University Class of 2028. Connect with future classmates, share experiences, and ask questions!',
    website: 'https://www.harvard.edu',
    followers: 8742,
    following: 128,
    pinnedPost: {
      id: 'pinned-guidelines',
      images: [Image1, Image2],
      caption: `Looking to connect with your future classmates? 👋\nMake sure to check out our posting guidelines and what to include in your intro! 💬📸\nLet's keep it respectful, fun, and school-friendly — and get to know each other before the fall! 🐾\n\n#CollegeBound #FutureFreshmen #MeetYourClassmates`,
      likes: 0,
      isPinned: true,
      user: {
        name: 'Harvard University',
        username: 'harvard.2028class',
        avatar: 'https://1000logos.net/wp-content/uploads/2017/02/Harvard-Logo.png'
      },
      postedAt: 'Now',
      comments: []
    },
    posts: []
  },
  '2': {
    id: '2',
    name: 'Stanford University',
    username: 'stanford.2028class',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Stanford_Cardinal_logo.svg/1200px-Stanford_Cardinal_logo.svg.png',
    bio: 'Stanford University Class of 2028 community. Join us to connect with fellow students and share your Stanford journey!',
    website: 'https://www.stanford.edu',
    followers: 7320,
    following: 95,
    posts: []
  },
  '3': {
    id: '3',
    name: 'MIT',
    username: 'mit.2028class',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/MIT_logo.svg/1200px-MIT_logo.svg.png',
    bio: 'Massachusetts Institute of Technology Class of 2028. For students, by students. Share your MIT journey here!',
    website: 'https://www.mit.edu',
    followers: 6892,
    following: 75,
    posts: []
  },
  '4': {
    id: '4',
    name: 'Yale University',
    username: 'yale.2028class',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Yale_University_logo.svg/1200px-Yale_University_logo.svg.png',
    bio: 'Welcome to the Yale University Class of 2028 community! Connect with classmates and share your Yale experience.',
    website: 'https://www.yale.edu',
    followers: 5834,
    following: 82,
    posts: []
  },
  '5': {
    id: '5',
    name: 'Princeton University',
    username: 'princeton.2028class',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Princeton_seal.svg/1200px-Princeton_seal.svg.png',
    bio: 'Princeton University Class of 2028 community. Share your Princeton journey and connect with fellow tigers!',
    website: 'https://www.princeton.edu',
    followers: 5462,
    following: 68,
    posts: []
  },
  '6': {
    id: '6',
    name: 'Columbia University',
    username: 'columbia.2028class',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Columbia_University_shield.svg/1200px-Columbia_University_shield.svg.png',
    bio: 'Official community for Columbia University Class of 2028. Connect with fellow students in the heart of NYC!',
    website: 'https://www.columbia.edu',
    followers: 4983,
    following: 71,
    posts: []
  },
  '7': {
    id: '7',
    name: 'Cornell University',
    username: 'cornell.2028class',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Cornell_University_seal.svg/1200px-Cornell_University_seal.svg.png',
    bio: 'Cornell University Class of 2028. Share your Cornell experiences and connect with other Cornellians!',
    website: 'https://www.cornell.edu',
    followers: 4521,
    following: 63,
    posts: []
  },
  '8': {
    id: '8',
    name: 'Brown University',
    username: 'brown.2028class',
    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/3/31/Brown_University_coat_of_arms.svg/1200px-Brown_University_coat_of_arms.svg.png',
    bio: 'Brown University Class of 2028. Share your journey at Brown and connect with fellow Brunonians!',
    website: 'https://www.brown.edu',
    followers: 3895,
    following: 58,
    posts: []
  },
  '9': {
    id: '9',
    name: 'Duke University',
    username: 'duke.2028class',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Duke_Athletics_logo.svg/1200px-Duke_Athletics_logo.svg.png',
    bio: 'Official community for Duke University Class of 2028. Connect with fellow Blue Devils!',
    website: 'https://www.duke.edu',
    followers: 3512,
    following: 54,
    posts: []
  },
  '10': {
    id: '10',
    name: 'University of Chicago',
    username: 'uchicago.2028class',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Uchicago_shield.svg/1200px-Uchicago_shield.svg.png',
    bio: 'University of Chicago Class of 2028. Connect with classmates and share your UChicago experience!',
    website: 'https://www.uchicago.edu',
    followers: 3278,
    following: 42,
    posts: []
  },
  '11': {
    id: '11',
    name: 'UC Berkeley',
    username: 'berkeley.2028class',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Seal_of_University_of_California%2C_Berkeley.svg/1200px-Seal_of_University_of_California%2C_Berkeley.svg.png',
    bio: 'UC Berkeley Class of 2028. Connect with fellow Golden Bears and share your Berkeley journey!',
    website: 'https://www.berkeley.edu',
    followers: 4156,
    following: 67,
    posts: []
  },
  '12': {
    id: '12',
    name: 'NYU',
    username: 'nyu.2028class',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/NYU_Tandon_School_of_Engineering_logo.svg/1200px-NYU_Tandon_School_of_Engineering_logo.svg.png',
    bio: 'New York University Class of 2028. Connect with fellow NYU students and experience NYC together!',
    website: 'https://www.nyu.edu',
    followers: 3872,
    following: 59,
    posts: []
  }
};

// Set Harvard's pinned post for all other colleges
const harvardPinnedPost = collegeProfiles['1'].pinnedPost;
for (const collegeId in collegeProfiles) {
  if (collegeId !== '1') {
    collegeProfiles[collegeId].pinnedPost = {
      ...harvardPinnedPost,
      // Ensure user details in the pinned post reflect the current college if needed
      // For now, we'll keep Harvard's user details for the pinned post across all communities
      // If you want the pinned post to show the *current* college's username/avatar:
      // user: {
      //   name: collegeProfiles[collegeId].name,
      //   username: collegeProfiles[collegeId].username,
      //   avatar: collegeProfiles[collegeId].logo
      // }
    };
  }
}

const CollegeCommunityScreen = () => {
  const { width } = Dimensions.get('window');
  const params = useLocalSearchParams();
  const collegeId = params.id as string || '1';
  
  // Get college data based on ID
  const college = collegeProfiles[collegeId];
  
  const [isFollowing, setIsFollowing] = useState(false);
  const [showPostModal, setShowPostModal] = useState(false);
  const [currentPostIndex, setCurrentPostIndex] = useState(0);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [newPostCaption, setNewPostCaption] = useState('');
  // Carousel state for modal
  const [carouselIndex, setCarouselIndex] = useState(0);
  const carouselRef = useRef(null);
  const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
    if (viewableItems && viewableItems.length > 0) {
      setCarouselIndex(viewableItems[0].index || 0);
    }
  });
  
  // Animation
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;
  
  React.useEffect(() => {
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
  
  if (!college) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: '#f5f7fa' }]}>
        <StatusBar barStyle="dark-content" />
        <View style={styles.errorContainer}>
          <Text style={[styles.errorText, { color: '#333' }]}>College community not found</Text>
          <TouchableOpacity style={styles.errorBackButton} onPress={() => router.back()}>
            <Text style={styles.backButtonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
  
  // Toggle follow status
  const toggleFollow = () => {
    setIsFollowing(!isFollowing);
  };
  
  // Navigate back
  const navigateBack = () => {
    router.back();
  };
  
  // Open post modal
  const openPostModal = (index: number, isPinned = false) => {
    setCurrentPostIndex(index);
    setCarouselIndex(0); // Reset carousel to first image when opening
    setShowPostModal(true);
  };
  
  // Close post modal
  const closePostModal = () => {
    setShowPostModal(false);
  };
  
  // Post navigation is now handled by swiping
  

  
  // Open upload modal
  const openUploadModal = () => {
    setShowUploadModal(true);
  };
  
  // Close upload modal
  const closeUploadModal = () => {
    setShowUploadModal(false);
    setNewPostCaption('');
  };
  
  // Handle reporting a post
  const handleReportPost = (postId: string) => {
    Alert.alert(
      "Report Post",
      "Are you sure you want to report this post for not following the rules and guidelines?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { 
          text: "Report", 
          onPress: () => {
            console.log(`Post ${postId} reported`);
            // In a real app, you would send this report to your backend
            Alert.alert("Post Reported", "Thank you for your feedback. The post has been reported for review.");
          },
          style: "destructive" 
        }
      ]
    );
  };
  
  // Submit a new post
  const submitPost = () => {
    if (newPostCaption.trim() === '') {
      Alert.alert('Error', 'Please add a caption to your post');
      return;
    }
    
    // In a real app, this would upload the image and caption to a backend
    Alert.alert(
      'Post Created', 
      'Your post has been created and will appear in the feed!',
      [
        { 
          text: 'OK', 
          onPress: () => {
            // Simulate adding a new post to the feed
            const newPost = {
              id: `new-post-${Date.now()}`,
              image: 'https://www.harvard.edu/wp-content/uploads/2021/02/091520_Campus_0595-1200x630.jpg', // Would be the selected image
              caption: newPostCaption,
              likes: 0,
              user: {
                name: 'Your Name',
                username: 'your.username',
                avatar: 'https://randomuser.me/api/portraits/men/32.jpg' // Would be the user's avatar
              },
              postedAt: 'Just now',
              comments: []
            };
            
            // This is a simple simulation since we're not actually modifying state in this demo
            console.log('New post created:', newPost);
            closeUploadModal();
          }
        }
      ]
    );
  };
  
  // Not needed anymore as we've integrated the rendering directly into the FlatList

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={navigateBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
      </View>
      
      <Animated.ScrollView 
        showsVerticalScrollIndicator={false}
        style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}
      >
        {/* Profile Card */}
        <LinearGradient
          colors={['#ffffff', '#f9fafb']}
          style={styles.profileCard}
        >
          <View style={styles.profileInfo}>
            <View style={styles.profileLeft}>
              <Image source={{ uri: college.logo }} style={styles.profileLogo} />
            </View>
            
            <View style={styles.profileStats}>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{college.followers}</Text>
                <Text style={styles.statLabel}>Members</Text>
              </View>
            </View>
          </View>
          
          {/* Profile Name and Bio */}
          <View style={styles.bioContainer}>
            <Text style={styles.displayName}>{college.name}</Text>
            <Text style={styles.bioText}>{college.bio}</Text>
            {college.website && (
              <TouchableOpacity>
                <Text style={styles.websiteLink}>{college.website}</Text>
              </TouchableOpacity>
            )}
          </View>
        </LinearGradient>
        
        {/* Class Year Dropdown */}
        <View style={styles.actionButtonsContainer}>
          <TouchableOpacity 
            style={styles.classYearDropdown}
            onPress={() => Alert.alert('Switch Class', 'Select a class year:', [
              { text: 'Class of 2028', onPress: () => console.log('2028 selected') },
              { text: 'Class of 2027', onPress: () => console.log('2027 selected') },
              { text: 'Class of 2026', onPress: () => console.log('2026 selected') },
              { text: 'Class of 2025', onPress: () => console.log('2025 selected') },
              { text: 'Cancel', style: 'cancel' }
            ])}
          >
            <Text style={styles.classYearText}>Class of 2028</Text>
            <Ionicons name="chevron-down" size={16} color="#333" />
          </TouchableOpacity>
        </View>
        
        {/* Content Header */}
        <View style={styles.contentHeading}>
          <Text style={styles.contentHeadingText}>Recent Posts</Text>
        </View>

        {/* Grid View of All Posts */}
        <FlatList
          data={college.pinnedPost ? [{ ...college.pinnedPost, isPinned: true }, ...college.posts] : college.posts}
          renderItem={({ item, index }: { item: any; index: number }) => (
            <TouchableOpacity 
              style={styles.gridItem} 
              onPress={() => openPostModal(index)}
              activeOpacity={0.9}
            >
              {item.images ? (
                <View style={{ flex: 1 }}>
                  {item.images.map((img: any, idx: number) => (
                    <Image key={idx} source={img} style={styles.gridImage} />
                  ))}
                </View>
              ) : (
                <Image source={{ uri: item.image }} style={styles.gridImage} />
              )}
            </TouchableOpacity>
          )}
          keyExtractor={(item: any, index: number) => item.id || index.toString()}
          numColumns={3}
          scrollEnabled={false}
          style={styles.gridContainer}
          columnWrapperStyle={styles.gridRow}
        />
        
        <View style={{ height: 100 }} /> {/* Bottom padding for scroll */}
      </Animated.ScrollView>
      
      {/* Floating Add Button */}
      <LinearGradient
        colors={['#FF6B6B', '#FF8E8E']}
        style={styles.floatingButtonGradient}
      >
        <TouchableOpacity 
          style={styles.floatingAddButton} 
          onPress={openUploadModal}
          activeOpacity={0.8}
        >
          <Ionicons name="add" size={26} color="#fff" />
        </TouchableOpacity>
      </LinearGradient>
      
      {/* Post Modal (Lightbox) */}
      <Modal
        visible={showPostModal}
        animationType="slide"
        transparent={false}
        onRequestClose={closePostModal}
      >
        <SafeAreaView style={styles.postModalContainer}>
          <View style={styles.postModalHeader}>
            <TouchableOpacity onPress={closePostModal} style={styles.modalBackButton}>
              <Ionicons name="arrow-back" size={24} color="#333" />
            </TouchableOpacity>
            <Text style={styles.postModalTitle}>Posts</Text>
            <View style={styles.modalBackButton} />
          </View>
          
          <FlatList
            data={college.pinnedPost ? [{ ...college.pinnedPost, isPinned: true }, ...college.posts] : college.posts}
            keyExtractor={item => item.id}
            initialScrollIndex={currentPostIndex}
            getItemLayout={(data, index) => ({
              length: Dimensions.get('window').height - 100, // approximate height of a post
              offset: (Dimensions.get('window').height - 100) * index,
              index,
            })}
            onScrollToIndexFailed={() => {}}
            style={styles.postModalContent}
            showsVerticalScrollIndicator={false}
            snapToInterval={Dimensions.get('window').height - 100}
            decelerationRate="fast"
            pagingEnabled
            removeClippedSubviews={true}
            windowSize={3}
            maxToRenderPerBatch={2}
            renderItem={({ item }) => {
              const imageList = item.images || (item.image ? [item.image] : []);
              return (
                <View style={[styles.postContainer, { height: Dimensions.get('window').height - 100 }]}> 
                  {/* Post Header */}
                  <View style={styles.postHeader}>
                    <View style={styles.postUser}>
                      <Image 
                        source={{ uri: item.user?.avatar || college.logo }} 
                        style={styles.postUserAvatar}
                      />
                      <View>
                        <Text style={styles.postUserName}>
                          {item.user?.username || college.username}
                        </Text>
                        {!item.isPinned && (
                          <Text style={styles.postLocation}>{college.name}</Text>
                        )}
                      </View>
                    </View>
                    <TouchableOpacity style={styles.postMoreButton} onPress={() => handleReportPost(item.id)}>
                      <Ionicons name="ellipsis-horizontal" size={20} color="#333" />
                    </TouchableOpacity>
                  </View>
                  {/* Post Images Carousel */}
                  <View style={styles.postImageContainer}>
                    {imageList.length > 1 ? (
                      <>
                        <FlatList
                          ref={carouselRef}
                          data={imageList}
                          horizontal
                          pagingEnabled
                          showsHorizontalScrollIndicator={false}
                          keyExtractor={(_: any, idx: number) => idx.toString()}
                          renderItem={({ item: img }) => (
                            <ImageBackground
                              source={typeof img === 'number' ? img : { uri: img }}
                              style={{ width: width, height: 340, justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}
                              imageStyle={{ resizeMode: 'contain' }}
                            >
                              {/* You can overlay content here if needed */}
                            </ImageBackground>
                          )}
                          onViewableItemsChanged={onViewableItemsChanged.current}
                          viewabilityConfig={{ itemVisiblePercentThreshold: 80 }}
                          initialScrollIndex={carouselIndex}
                          style={{ width: width, height: 350 }}
                          contentContainerStyle={{ alignItems: 'center', justifyContent: 'center' }}
                        />
                        {/* Dots Indicator */}
                        <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: -10, marginBottom: 8 }}>
                          {imageList.map((_: any, idx: number) => (
                            <View
                              key={idx}
                              style={{
                                width: 8,
                                height: 8,
                                borderRadius: 4,
                                marginHorizontal: 3,
                                backgroundColor: carouselIndex === idx ? '#FF6B6B' : '#e0e0e0',
                              }}
                            />
                          ))}
                        </View>
                      </>
                    ) : (
                      <ImageBackground
                        source={typeof imageList[0] === 'number' ? imageList[0] : { uri: imageList[0] }}
                        style={{ width: width, height: 340, justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}
                        imageStyle={{ resizeMode: 'contain' }}
                      >
                        {/* You can overlay content here if needed */}
                      </ImageBackground>
                    )}
                  </View>
                  {/* Post Actions */}
                  <View style={styles.postActions}>
                    <View style={styles.postActionLeft}>
                      <TouchableOpacity style={styles.postActionButton}>
                        <Ionicons name="heart-outline" size={26} color="#333" />
                      </TouchableOpacity>
                      <Text style={{ fontSize: 15, color: '#333', fontWeight: 'bold', marginLeft: 8, alignSelf: 'center' }}>
                        {item.likes.toLocaleString()} likes
                      </Text>
                    </View>
                  </View>
                  {/* Username and Caption (Instagram style) */}
                  <View style={{ paddingHorizontal: 12, marginTop: 6 }}>
                    <Text style={{ fontSize: 15, fontWeight: 'bold', color: '#333', marginBottom: 2 }}>
                      {item.user?.username || college.username}
                    </Text>
                    <Text style={{ fontSize: 15, color: '#333', lineHeight: 21 }}>
                      {item.caption}
                    </Text>
                  </View>
                  {/* Posted Time */}
                  <Text style={styles.postedTime}>
                    {item.postedAt}
                  </Text>
                  {/* Swipe indicator */}
                  <View style={styles.swipeIndicator}>
                    <Ionicons name="chevron-down" size={20} color="#999" />
                  </View>
                </View>
              );
            }}
          />
        </SafeAreaView>
      </Modal>
      
      {/* Upload Modal */}
      <Modal
        visible={showUploadModal}
        animationType="slide"
        transparent={false}
        onRequestClose={closeUploadModal}
      >
        <SafeAreaView style={styles.uploadModalContainer}>
          <View style={styles.uploadModalHeader}>
            <TouchableOpacity onPress={closeUploadModal} style={styles.modalBackButton}>
              <Ionicons name="close" size={24} color="#333" />
            </TouchableOpacity>
            <Text style={styles.uploadModalTitle}>New Post</Text>
            <TouchableOpacity onPress={submitPost} style={styles.submitButton}>
              <Text style={styles.submitButtonText}>Share</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.uploadContent}>
            <View style={styles.uploadImagePreview}>
              <TouchableOpacity style={styles.selectImageButton}>
                <Ionicons name="camera" size={50} color="#999" />
                <Text style={styles.selectImageText}>Tap to take or select a photo</Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.uploadOptions}>
              <TouchableOpacity style={styles.uploadOption}>
                <Ionicons name="camera-outline" size={24} color="#333" />
                <Text style={styles.uploadOptionText}>Camera</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.uploadOption}>
                <Ionicons name="images-outline" size={24} color="#333" />
                <Text style={styles.uploadOptionText}>Gallery</Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.captionInputContainer}>
              <TextInput
                style={styles.captionInput}
                placeholder="Write a caption..."
                placeholderTextColor="#999"
                multiline
                value={newPostCaption}
                onChangeText={setNewPostCaption}
              />
            </View>
            
            <View style={styles.tagOptions}>
              <Text style={styles.tagOptionsTitle}>Post to Your Community</Text>
            </View>
          </View>
        </SafeAreaView>
      </Modal>
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
  headerUsername: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  profileCard: {
    margin: 16,
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3.84,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  profileInfo: {
    flexDirection: 'row',
  },
  profileLeft: {
    marginRight: 20,
  },
  profileLogo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  profileStats: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
  },
  bioContainer: {
    marginTop: 16,
  },
  displayName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  bioText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    lineHeight: 20,
  },
  websiteLink: {
    fontSize: 14,
    color: '#3897f0',
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  classYearDropdown: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  classYearText: {
    color: '#333',
    fontWeight: '600',
    fontSize: 14,
    marginRight: 5,
  },
  contentHeading: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    marginBottom: 8,
  },
  contentHeadingText: {
    color: '#333',
    fontSize: 16,
    fontWeight: 'bold',
  },
  gridContainer: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 2,
  },
  gridRow: {
    justifyContent: 'flex-start',
  },
  gridItem: {
    width: Dimensions.get('window').width / 3,
    height: Dimensions.get('window').width / 3,
    padding: 1,
  },
  gridImage: {
    width: '100%',
    height: '100%',
    borderRadius: 4,
  },
  floatingButtonGradient: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    elevation: 5,
    shadowColor: '#FF6B6B',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    zIndex: 999,
  },
  floatingAddButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    color: '#333',
    marginBottom: 20,
  },
  errorBackButton: {
    backgroundColor: '#f5f5f5',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  backButtonText: {
    color: '#3897f0',
    fontSize: 16,
    fontWeight: '500',
  },
  // Post Modal Styles
  postModalContainer: {
    flex: 1,
    backgroundColor: '#f5f7fa',
  },
  postModalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  modalBackButton: {
    padding: 8,
    width: 40,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
  },
  postModalTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  postModalContent: {
    flex: 1,
    backgroundColor: '#fff',
  },
  postContainer: {
    marginBottom: 0,
    paddingBottom: 20, 
    justifyContent: 'space-between',
    backgroundColor: '#fff',
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#fff',
  },
  postUser: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  postUserAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  postUserName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  postLocation: {
    fontSize: 12,
    color: '#666',
  },
  postMoreButton: {
    padding: 5,
  },
  postImageContainer: {
    width: '100%',
    aspectRatio: 1,
    backgroundColor: '#f8f9fa',
    justifyContent: 'center',
    alignItems: 'center',
  },
  postImage: {
    width: '100%',
    maxHeight: 350,
    height: undefined,
    alignSelf: 'center',
    resizeMode: 'contain',
  },
  postActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  postActionLeft: {
    flexDirection: 'row',
  },
  postActionButton: {
    marginRight: 16,
    padding: 4,
  },
  likesText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    paddingHorizontal: 12,
    marginBottom: 6,
  },
  captionContainer: {
    paddingHorizontal: 12,
    flexDirection: 'row',
    marginBottom: 6,
  },
  captionUsername: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginRight: 6,
  },
  captionText: {
    fontSize: 14,
    color: '#333',
    flex: 1,
  },
  postedTime: {
    fontSize: 12,
    color: '#999',
    paddingHorizontal: 12,
    marginBottom: 10,
  },
  swipeIndicator: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  // Upload Modal Styles
  uploadModalContainer: {
    flex: 1,
    backgroundColor: '#f5f7fa',
  },
  uploadModalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  uploadModalTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  submitButton: {
    padding: 8,
    backgroundColor: '#FF6B6B',
    borderRadius: 16,
    paddingHorizontal: 12,
  },
  submitButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  uploadContent: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  uploadImagePreview: {
    width: '100%',
    height: 300,
    backgroundColor: '#f8f9fa',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderStyle: 'dashed',
  },
  selectImageButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectImageText: {
    color: '#666',
    marginTop: 10,
  },
  captionInputContainer: {
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  captionInput: {
    color: '#333',
    height: 100,
    textAlignVertical: 'top',
  },
  uploadOptions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 15,
  },
  uploadOption: {
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  uploadOptionText: {
    color: '#333',
    marginLeft: 8,
    fontWeight: '500',
  },
  tagOptions: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  tagOptionsTitle: {
    color: '#333',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
});

export default CollegeCommunityScreen; 