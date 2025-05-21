import React, { useState, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Animated,
  PanResponder,
  Dimensions,
  SafeAreaView,
  StatusBar,
  TouchableWithoutFeedback,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

const { width, height } = Dimensions.get('window');

// Sample college data with multiple images
const COLLEGES = [
  {
    id: 1,
    name: 'Harvard University',
    images: [
      'https://i.imgur.com/8RZoZJE.jpg',  // Harvard Yard
      'https://i.imgur.com/Y9rd5JP.jpg',  // Memorial Hall
      'https://i.imgur.com/QjGQ4Ni.jpg',  // Science Center
      'https://i.imgur.com/VYJu3Qp.jpg',  // Library
      'https://i.imgur.com/wqZZnZx.jpg'   // Stadium
    ],
    location: 'Cambridge, MA',
    stats: {
      acceptance: '5%',
      tuition: '$52,659/year',
      students: '6,699'
    }
  },
  {
    id: 2,
    name: 'Stanford University',
    images: [
      'https://i.imgur.com/JZeVuXa.jpg',  // Main Quad
      'https://i.imgur.com/QWxmqDT.jpg',  // Memorial Church
      'https://i.imgur.com/XDyXKNm.jpg',  // Hoover Tower
      'https://i.imgur.com/pzwGQ9x.jpg',  // Engineering Quad
      'https://i.imgur.com/L8zp2dX.jpg'   // The Oval
    ],
    location: 'Stanford, CA',
    stats: {
      acceptance: '4%',
      tuition: '$56,169/year',
      students: '7,645'
    }
  },
  {
    id: 3,
    name: 'MIT',
    images: [
      'https://i.imgur.com/YZ7G6ny.jpg',  // Great Dome
      'https://i.imgur.com/4YWtGF5.jpg',  // Stata Center
      'https://i.imgur.com/BqQyvsH.jpg',  // Media Lab
      'https://i.imgur.com/mF6GRap.jpg',  // Campus Center
      'https://i.imgur.com/DKquDfn.jpg'   // River View
    ],
    location: 'Cambridge, MA',
    stats: {
      acceptance: '7%',
      tuition: '$53,790/year',
      students: '4,361'
    }
  },
  {
    id: 4,
    name: 'Yale University',
    images: [
      'https://i.imgur.com/VNxUWqT.jpg',  // Old Campus
      'https://i.imgur.com/8H1mZW5.jpg',  // Sterling Library
      'https://i.imgur.com/YkP7Zwj.jpg',  // Beinecke Library
      'https://i.imgur.com/q2vZxvM.jpg',  // Residential College
      'https://i.imgur.com/LWdXkXN.jpg'   // Law School
    ],
    location: 'New Haven, CT',
    stats: {
      acceptance: '6.3%',
      tuition: '$57,700/year',
      students: '6,494'
    }
  },
  {
    id: 5,
    name: 'Princeton University',
    images: [
      'https://i.imgur.com/NbQZINn.jpg',  // Nassau Hall
      'https://i.imgur.com/xYimQQw.jpg',  // Chapel
      'https://i.imgur.com/2OQsHBf.jpg',  // Library
      'https://i.imgur.com/WvbLtIx.jpg',  // Blair Hall
      'https://i.imgur.com/mKjqZpl.jpg'   // Campus View
    ],
    location: 'Princeton, NJ',
    stats: {
      acceptance: '5.8%',
      tuition: '$56,010/year',
      students: '5,428'
    }
  },
  {
    id: 6,
    name: 'Columbia University',
    images: [
      'https://i.imgur.com/UyMkBTx.jpg',  // Low Library
      'https://i.imgur.com/H9o7kJG.jpg',  // Butler Library
      'https://i.imgur.com/VQXwGZx.jpg',  // College Walk
      'https://i.imgur.com/JgB3xQJ.jpg',  // Alma Mater
      'https://i.imgur.com/L5QRcYQ.jpg'   // Campus Night
    ],
    location: 'New York, NY',
    stats: {
      acceptance: '5.4%',
      tuition: '$61,671/year',
      students: '6,170'
    }
  }
];

export default function Index() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentImageIndexes, setCurrentImageIndexes] = useState(COLLEGES.map(() => 0));
  const [flippedCards, setFlippedCards] = useState(COLLEGES.map(() => false));
  const position = useRef(new Animated.ValueXY()).current;
  const rotation = position.x.interpolate({
    inputRange: [-width / 2, 0, width / 2],
    outputRange: ['-10deg', '0deg', '10deg']
  });

  const likeOpacity = position.x.interpolate({
    inputRange: [0, width / 4],
    outputRange: [0, 1]
  });

  const nopeOpacity = position.x.interpolate({
    inputRange: [-width / 4, 0],
    outputRange: [1, 0]
  });

  const flipRotation = useRef(COLLEGES.map(() => new Animated.Value(0))).current;
  const [searchQuery, setSearchQuery] = useState('');

  const handleImageTap = (side: 'left' | 'right', cardIndex: number) => {
    setCurrentImageIndexes(prevIndexes => {
      const newIndexes = [...prevIndexes];
      const currentImageIndex = newIndexes[cardIndex];
      const maxImages = COLLEGES[cardIndex].images.length;

      if (side === 'left' && currentImageIndex > 0) {
        newIndexes[cardIndex] = currentImageIndex - 1;
      } else if (side === 'right' && currentImageIndex < maxImages - 1) {
        newIndexes[cardIndex] = currentImageIndex + 1;
      }

      return newIndexes;
    });
  };

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (_, gesture) => {
      position.setValue({ x: gesture.dx, y: gesture.dy });
    },
    onPanResponderRelease: (_, gesture) => {
      if (gesture.dx > 120) {
        swipeRight();
      } else if (gesture.dx < -120) {
        swipeLeft();
      } else {
        resetPosition();
      }
    }
  });

  const swipeLeft = () => {
    Animated.timing(position, {
      toValue: { x: -width * 1.5, y: 0 },
      duration: 250,
      useNativeDriver: true
    }).start(() => nextCard());
  };

  const swipeRight = () => {
    Animated.timing(position, {
      toValue: { x: width * 1.5, y: 0 },
      duration: 250,
      useNativeDriver: true
    }).start(() => nextCard());
  };

  const resetPosition = () => {
    Animated.spring(position, {
      toValue: { x: 0, y: 0 },
      friction: 4,
      useNativeDriver: true
    }).start();
  };

  const nextCard = () => {
    setCurrentIndex(currentIndex + 1);
    position.setValue({ x: 0, y: 0 });
  };

  const handleFlip = (index: number) => {
    const isFlipped = flippedCards[index];
    Animated.spring(flipRotation[index], {
      toValue: isFlipped ? 0 : 1,
      friction: 8,
      tension: 10,
      useNativeDriver: true,
    }).start();
    
    const newFlippedCards = [...flippedCards];
    newFlippedCards[index] = !isFlipped;
    setFlippedCards(newFlippedCards);
  };

  const renderImageIndicators = (college: typeof COLLEGES[0], cardIndex: number) => {
    return (
      <View style={styles.imageIndicators}>
        {college.images.map((_, index) => (
          <View
            key={index}
            style={[
              styles.imageIndicator,
              {
                backgroundColor: index === currentImageIndexes[cardIndex] ? '#fff' : 'rgba(255,255,255,0.5)',
                width: index === currentImageIndexes[cardIndex] ? 20 : 12
              }
            ]}
          />
        ))}
      </View>
    );
  };

  const renderCardBack = (college: typeof COLLEGES[0]) => {
    return (
      <View style={styles.cardBack}>
        <Text style={styles.backTitle}>Overview</Text>
        <View style={styles.backContent}>
          <Text style={styles.overviewText}>
            {college.name} is one of the world's leading academic institutions, known for its excellence in education, research, and innovation.
          </Text>
          
          <View style={styles.quickStats}>
            <Text style={styles.quickStatsTitle}>Quick Facts</Text>
            <View style={styles.quickStatsGrid}>
              <View style={styles.quickStat}>
                <Text style={styles.quickStatLabel}>Founded</Text>
                <Text style={styles.quickStatValue}>1636</Text>
              </View>
              <View style={styles.quickStat}>
                <Text style={styles.quickStatLabel}>Ranking</Text>
                <Text style={styles.quickStatValue}>#1</Text>
              </View>
              <View style={styles.quickStat}>
                <Text style={styles.quickStatLabel}>Student-Faculty</Text>
                <Text style={styles.quickStatValue}>7:1</Text>
              </View>
              <View style={styles.quickStat}>
                <Text style={styles.quickStatLabel}>Research Budget</Text>
                <Text style={styles.quickStatValue}>$1.2B</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  };

  const renderCards = () => {
    if (currentIndex >= COLLEGES.length) {
      return (
        <View style={styles.endMessage}>
          <Text style={styles.endMessageText}>No more colleges to show!</Text>
          <Text style={styles.endMessageSubtext}>Check back later for more options</Text>
        </View>
      );
    }

    const college = COLLEGES[currentIndex];
    const frontInterpolate = flipRotation[currentIndex].interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '180deg']
    });

    const backInterpolate = flipRotation[currentIndex].interpolate({
      inputRange: [0, 1],
      outputRange: ['180deg', '360deg']
    });

    const frontAnimatedStyle = {
      transform: [
        { rotateY: frontInterpolate }
      ]
    };

    const backAnimatedStyle = {
      transform: [
        { rotateY: backInterpolate }
      ]
    };

    const cardStyle = {
      transform: [
        { translateX: position.x },
        { translateY: position.y },
        { rotate: rotation }
      ],
    };

    return (
      <Animated.View
        key={college.id}
        style={[styles.card, cardStyle]}
        {...panResponder.panHandlers}
      >
        <TouchableOpacity 
          style={styles.flipButton}
          onPress={() => handleFlip(currentIndex)}
        >
          <Ionicons name="information-circle" size={28} color="#fff" />
        </TouchableOpacity>

        <Animated.View style={[styles.cardFace, frontAnimatedStyle]}>
          <TouchableWithoutFeedback
            onPress={(event: any) => {
              if (!flippedCards[currentIndex]) {
                const locationX = event.nativeEvent.locationX;
                handleImageTap(locationX < width * 0.45 ? 'left' : 'right', currentIndex);
              }
            }}
          >
            <View style={styles.imageContainer}>
              <Image 
                source={{ uri: college.images[currentImageIndexes[currentIndex]] }} 
                style={styles.image} 
              />
              <LinearGradient
                colors={['transparent', 'rgba(0,0,0,0.7)', 'rgba(0,0,0,0.9)']}
                style={styles.gradient}
              />
              {renderImageIndicators(college, currentIndex)}
              
              <View style={styles.cardContent}>
                <Text style={styles.name}>{college.name}</Text>
                <Text style={styles.location}>{college.location}</Text>
                
                <View style={styles.statsContainer}>
                  <View style={styles.stat}>
                    <Text style={styles.statLabel}>Acceptance</Text>
                    <Text style={styles.statValue}>{college.stats.acceptance}</Text>
                  </View>
                  <View style={styles.stat}>
                    <Text style={styles.statLabel}>Students</Text>
                    <Text style={styles.statValue}>{college.stats.students}</Text>
                  </View>
                  <View style={styles.stat}>
                    <Text style={styles.statLabel}>Tuition</Text>
                    <Text style={styles.statValue}>{college.stats.tuition}</Text>
                  </View>
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Animated.View>

        <Animated.View style={[styles.cardFace, styles.cardFaceBack, backAnimatedStyle]}>
          {renderCardBack(college)}
        </Animated.View>

        <Animated.View style={[styles.likeContainer, { opacity: likeOpacity }]}>
          <Text style={styles.likeText}>LIKE</Text>
        </Animated.View>
        <Animated.View style={[styles.nopeContainer, { opacity: nopeOpacity }]}>
          <Text style={styles.nopeText}>NOPE</Text>
        </Animated.View>
      </Animated.View>
    );
  };

  const handleProfilePress = () => {
    router.push('/profile');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <Text style={styles.logo}>SWIPEU</Text>
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search colleges..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#999"
          />
        </View>
        <TouchableOpacity style={styles.profileButton} onPress={handleProfilePress}>
          <Ionicons name="person-circle" size={32} color="#FF6B6B" />
        </TouchableOpacity>
      </View>
      <View style={styles.cardContainer}>
        {renderCards()}
      </View>
    </SafeAreaView>
  );
}

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
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  logo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF6B6B',
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 20,
    marginHorizontal: 10,
    paddingHorizontal: 12,
    height: 36,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    padding: 0,
  },
  profileButton: {
    padding: 4,
  },
  cardContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  card: {
    width: width * 0.9,
    height: height * 0.7,
    borderRadius: 20,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    overflow: 'hidden',
    position: 'absolute',
    left: width * 0.05,
  },
  imageContainer: {
    width: '100%',
    height: '100%',
    position: 'relative',
    borderRadius: 20,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '70%',
    zIndex: 1,
  },
  cardContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    zIndex: 2,
  },
  name: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  location: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 20,
    opacity: 0.9,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.2)',
  },
  stat: {
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 12,
    color: '#fff',
    opacity: 0.8,
    marginBottom: 4,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  statValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  imageIndicators: {
    position: 'absolute',
    top: 20,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  imageIndicator: {
    height: 4,
    borderRadius: 2,
    marginHorizontal: 3,
    backgroundColor: '#fff',
  },
  likeContainer: {
    position: 'absolute',
    top: 50,
    left: 40,
    zIndex: 1,
    transform: [{ rotate: '-30deg' }],
  },
  nopeContainer: {
    position: 'absolute',
    top: 50,
    right: 40,
    zIndex: 1,
    transform: [{ rotate: '30deg' }],
  },
  likeText: {
    borderWidth: 4,
    borderRadius: 5,
    borderColor: '#4CD964',
    color: '#4CD964',
    fontSize: 32,
    fontWeight: 'bold',
    padding: 10,
    backgroundColor: 'rgba(76, 217, 100, 0.2)',
  },
  nopeText: {
    borderWidth: 4,
    borderRadius: 5,
    borderColor: '#FF3B30',
    color: '#FF3B30',
    fontSize: 32,
    fontWeight: 'bold',
    padding: 10,
    backgroundColor: 'rgba(255, 59, 48, 0.2)',
  },
  endMessage: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  endMessageText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2D3436',
    textAlign: 'center',
  },
  endMessageSubtext: {
    fontSize: 16,
    color: '#636E72',
    textAlign: 'center',
    marginTop: 10,
  },
  flipButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 10,
    padding: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  cardFace: {
    width: '100%',
    height: '100%',
    backfaceVisibility: 'hidden',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  cardFaceBack: {
    transform: [{ rotateY: '180deg' }],
  },
  cardBack: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
  },
  backTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2D3436',
    marginBottom: 20,
  },
  backContent: {
    flex: 1,
  },
  overviewText: {
    fontSize: 16,
    color: '#636E72',
    lineHeight: 24,
    marginBottom: 30,
  },
  quickStats: {
    marginTop: 20,
  },
  quickStatsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2D3436',
    marginBottom: 15,
  },
  quickStatsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickStat: {
    width: '48%',
    backgroundColor: '#F0F3F4',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  quickStatLabel: {
    fontSize: 14,
    color: '#636E72',
    marginBottom: 5,
  },
  quickStatValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2D3436',
  },
}); 