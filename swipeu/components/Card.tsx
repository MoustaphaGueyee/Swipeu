import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity, TouchableWithoutFeedback, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');
const CARD_WIDTH = width * 0.9;
const CARD_HEIGHT = height * 0.7; // Slightly taller cards

export interface CardItem {
  id: number;
  name: string;
  images: string[];
  location: string;
  acceptanceRate: string;
  size: string;
  tuition: string;
  overview: string;
  popularMajors: string[];
}

interface CardProps {
  item: CardItem;
  onFlipChange?: (isFlipped: boolean) => void;
}

const Card: React.FC<CardProps> = ({ item, onFlipChange }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const flipAnim = useRef(new Animated.Value(0)).current;

  const nextImage = () => {
    if (currentImageIndex < item.images.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  const prevImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const handleImageTap = (event: any) => {
    if (isFlipped) return; // Disable image navigation when flipped
    const { locationX } = event.nativeEvent;
    if (locationX < CARD_WIDTH / 2) {
      prevImage();
    } else {
      nextImage();
    }
  };

  const flipCard = () => {
    const newIsFlipped = !isFlipped;
    setIsFlipped(newIsFlipped);
    onFlipChange?.(newIsFlipped);
    
    Animated.spring(flipAnim, {
      toValue: newIsFlipped ? 1 : 0,
      friction: 8,
      tension: 10,
      useNativeDriver: true,
    }).start();
  };

  const frontInterpolate = flipAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  const backInterpolate = flipAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['180deg', '360deg'],
  });

  const frontAnimatedStyle = {
    transform: [{ rotateY: frontInterpolate }],
  };

  const backAnimatedStyle = {
    transform: [{ rotateY: backInterpolate }],
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.card, styles.cardFront, frontAnimatedStyle, { opacity: isFlipped ? 0 : 1 }]}>
        <TouchableWithoutFeedback onPress={handleImageTap}>
          <View style={styles.imageContainer}>
            <Image 
              source={{ uri: item.images[currentImageIndex] }} 
              style={styles.image} 
              resizeMode="cover"
            />
            <LinearGradient
              colors={['rgba(0,0,0,0.6)', 'transparent', 'transparent', 'rgba(0,0,0,0.3)']}
              style={styles.imageGradient}
            />
          </View>
        </TouchableWithoutFeedback>
        
        <View style={styles.cardContent}>
          <View style={styles.headerContainer}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.location}>{item.location}</Text>
          </View>

          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Acceptance Rate</Text>
              <Text style={styles.statValue}>{item.acceptanceRate}</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Student Body</Text>
              <Text style={styles.statValue}>{item.size}</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Annual Tuition</Text>
              <Text style={styles.statValue}>{item.tuition}</Text>
            </View>
          </View>
        </View>
        
        <View style={styles.controlsContainer}>
          <TouchableOpacity 
            style={[styles.favoriteButton, isFavorite && styles.favoriteButtonActive]} 
            onPress={toggleFavorite}
          >
            <Ionicons 
              name={isFavorite ? "bookmark" : "bookmark-outline"} 
              size={24} 
              color={isFavorite ? "#4A90E2" : "#fff"} 
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.flipButton} onPress={flipCard}>
          <Ionicons name="information-circle" size={24} color="#fff" />
        </TouchableOpacity>
        
        <View style={styles.imageIndicator}>
          {item.images.map((_, index) => (
            <View 
              key={index} 
              style={[
                styles.indicatorDot, 
                { backgroundColor: index === currentImageIndex ? '#4A90E2' : 'rgba(255,255,255,0.6)' }
              ]} 
            />
          ))}
        </View>
      </Animated.View>

      <Animated.View style={[styles.card, styles.cardBack, backAnimatedStyle, { opacity: isFlipped ? 1 : 0 }]}>
        <LinearGradient
          colors={['#2D3436', '#636E72']}
          style={styles.cardBackContent}
        >
          <Text style={styles.backTitle}>About {item.name}</Text>
          
          <View style={styles.backSection}>
            <Text style={styles.backSectionTitle}>Overview</Text>
            <Text style={styles.backText}>{item.overview}</Text>
          </View>
          
          <View style={styles.backSection}>
            <Text style={styles.backSectionTitle}>Popular Majors</Text>
            {item.popularMajors.map((major, index) => (
              <Text key={index} style={styles.majorItem}>• {major}</Text>
            ))}
          </View>

          <TouchableOpacity style={styles.flipBackButton} onPress={flipCard}>
            <Ionicons name="arrow-back-circle" size={24} color="#fff" />
            <Text style={styles.flipBackText}>Back to Card</Text>
          </TouchableOpacity>
        </LinearGradient>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
  },
  card: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
    overflow: 'hidden',
    position: 'absolute',
    backfaceVisibility: 'hidden',
  },
  cardFront: {
    zIndex: 1,
  },
  cardBack: {
    backgroundColor: '#2D3436',
  },
  imageContainer: {
    width: '100%',
    height: '70%',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imageGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  cardContent: {
    padding: 20,
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#fff',
  },
  headerContainer: {
    marginBottom: 15,
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2D3436',
    marginBottom: 4,
  },
  location: {
    fontSize: 16,
    color: '#636E72',
    fontWeight: '500',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  divider: {
    width: 1,
    height: 40,
    backgroundColor: '#E0E0E0',
    marginHorizontal: 10,
  },
  statLabel: {
    fontSize: 12,
    color: '#636E72',
    marginBottom: 4,
    textAlign: 'center',
  },
  statValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D3436',
    textAlign: 'center',
  },
  controlsContainer: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 10,
  },
  favoriteButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.5)',
  },
  favoriteButtonActive: {
    backgroundColor: 'white',
    borderColor: '#4A90E2',
  },
  flipButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.5)',
    zIndex: 10,
  },
  imageIndicator: {
    position: 'absolute',
    bottom: '32%',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  indicatorDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  cardBackContent: {
    flex: 1,
    padding: 25,
  },
  backTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 25,
  },
  backSection: {
    marginBottom: 25,
  },
  backSectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#4A90E2',
    marginBottom: 10,
  },
  backText: {
    fontSize: 16,
    color: '#fff',
    lineHeight: 24,
  },
  majorItem: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 8,
    lineHeight: 24,
  },
  flipBackButton: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    bottom: 25,
    left: 25,
  },
  flipBackText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 8,
    fontWeight: '500',
  },
});

export default Card; 