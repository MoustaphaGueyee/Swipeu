import React, { useRef, useState } from 'react';
import { StyleSheet, View, Dimensions, Animated, PanResponder } from 'react-native';
import Card, { CardItem } from './Card';

const { width, height } = Dimensions.get('window');
const SWIPE_THRESHOLD = width * 0.25;
const SWIPE_OUT_DURATION = 250;

interface SwipeCardsProps {
  data: CardItem[];
  onSwipeLeft: (item: CardItem) => void;
  onSwipeRight: (item: CardItem) => void;
  renderNoMoreCards: () => React.ReactNode;
}

const SwipeCards: React.FC<SwipeCardsProps> = ({ 
  data, 
  onSwipeLeft, 
  onSwipeRight, 
  renderNoMoreCards 
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isCardFlipped, setIsCardFlipped] = useState(false);
  const position = useRef(new Animated.ValueXY()).current;

  const rotation = position.x.interpolate({
    inputRange: [-width / 2, 0, width / 2],
    outputRange: ['-10deg', '0deg', '10deg'],
    extrapolate: 'clamp'
  });

  const nextCardScale = position.x.interpolate({
    inputRange: [-width / 2, 0, width / 2],
    outputRange: [1, 0.93, 1],
    extrapolate: 'clamp'
  });

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => !isCardFlipped,
      onMoveShouldSetPanResponder: () => !isCardFlipped,
      onPanResponderMove: (_, gesture) => {
        if (!isCardFlipped) {
          position.setValue({ x: gesture.dx, y: gesture.dy });
        }
      },
      onPanResponderRelease: (_, gesture) => {
        if (isCardFlipped) return;

        if (gesture.dx > SWIPE_THRESHOLD) {
          forceSwipe('right');
        } else if (gesture.dx < -SWIPE_THRESHOLD) {
          forceSwipe('left');
        } else {
          resetPosition();
        }
      }
    })
  ).current;

  const forceSwipe = (direction: 'right' | 'left') => {
    if (isCardFlipped) return;

    const x = direction === 'right' ? width + 100 : -width - 100;
    Animated.timing(position, {
      toValue: { x, y: 0 },
      duration: SWIPE_OUT_DURATION,
      useNativeDriver: true
    }).start(() => onSwipeComplete(direction));
  };

  const onSwipeComplete = (direction: 'right' | 'left') => {
    const item = data[currentIndex];
    direction === 'right' ? onSwipeRight(item) : onSwipeLeft(item);
    position.setValue({ x: 0, y: 0 });
    setCurrentIndex(prevIndex => prevIndex + 1);
  };

  const resetPosition = () => {
    Animated.spring(position, {
      toValue: { x: 0, y: 0 },
      friction: 4,
      useNativeDriver: true
    }).start();
  };

  const handleFlipChange = (flipped: boolean) => {
    setIsCardFlipped(flipped);
  };

  const getCardStyle = () => {
    const rotate = position.x.interpolate({
      inputRange: [-width * 1.5, 0, width * 1.5],
      outputRange: ['-30deg', '0deg', '30deg']
    });

    return {
      transform: [
        { translateX: position.x },
        { translateY: position.y },
        { rotate }
      ]
    };
  };

  if (currentIndex >= data.length) {
    return renderNoMoreCards();
  }

  return (
    <View style={styles.container}>
      {data.map((item, i) => {
        if (i < currentIndex) return null;

        if (i === currentIndex) {
          return (
            <Animated.View
              key={item.id}
              style={[styles.cardStyle, getCardStyle()]}
              {...(isCardFlipped ? {} : panResponder.panHandlers)}
            >
              <Card item={item} onFlipChange={handleFlipChange} />
            </Animated.View>
          );
        }

        // Next card
        if (i === currentIndex + 1) {
          return (
            <Animated.View
              key={item.id}
              style={[
                styles.cardStyle,
                {
                  transform: [{ scale: nextCardScale }],
                }
              ]}
            >
              <Card item={item} />
            </Animated.View>
          );
        }

        // Rest of the stack
        return (
          <View
            key={item.id}
            style={[
              styles.cardStyle,
              {
                top: 10 * (i - currentIndex),
                opacity: Math.max(1 - (i - currentIndex) * 0.2, 0),
              }
            ]}
          >
            <Card item={item} />
          </View>
        );
      }).reverse()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  cardStyle: {
    position: 'absolute',
    width: width * 0.9,
    height: height * 0.7,
  }
});

export default SwipeCards; 