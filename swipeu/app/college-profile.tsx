import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
  useWindowDimensions
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Animated } from 'react-native';

// Mock college data - in a real app this would come from an API or database
const collegeData: { [key: string]: {
  id: string;
  name: string;
  location: string;
  type: string;
  image: string;
  logo: string;
  founded: number;
  acceptanceRate: string;
  facultyRatio: string;
  nationalRank: string;
  undergrads: number;
  graduates: number;
  about: string;
  admissions: any;
  academics: any;
  campusLife: any;
  notableAlumni?: { name: string; description: string }[];
  history?: string;
}} = {
  '1': {
    id: '1',
    name: 'Harvard University',
    location: 'Cambridge, Massachusetts',
    type: 'Private Ivy League research university',
    image: 'https://www.harvard.edu/wp-content/uploads/2020/10/042920_HarvardYard_058-1.jpg',
    logo: 'https://1000logos.net/wp-content/uploads/2017/02/Harvard-Logo.png',
    founded: 1636,
    acceptanceRate: '4%',
    facultyRatio: '6:1',
    nationalRank: '#3',
    undergrads: 6699,
    graduates: 13120,
    about: 'Harvard University is a private Ivy League research university in Cambridge, Massachusetts. Founded in 1636 as Harvard College and named for its first benefactor, the Puritan clergyman John Harvard, it is the oldest institution of higher learning in the United States and among the most prestigious in the world.',
    admissions: {
      requirements: 'Harvard has a highly competitive admissions process with an acceptance rate around 4%. The university looks for academic excellence, extracurricular distinction, personal qualities, and strong recommendations. The middle 50% of admitted students have SAT scores between 1460-1580 and ACT scores between 33-35.',
      tuition: {
        undergraduate: '$54,768',
        graduate: 'Varies by program',
        roomBoard: '$19,502'
      }
    },
    academics: {
      programs: 'Harvard offers over 3,700 courses in 50 undergraduate fields of study, which it calls "concentrations," and more than 40 graduate programs. The university has the largest financial endowment of any academic institution in the world, valued at about $53.2 billion as of June 2021.',
      populatMajors: [
        'Computer Science',
        'Economics',
        'Political Science',
        'Biology',
        'History'
      ],
      research: 'Harvard has one of the largest research enterprises of any university. It contains more than 100 research centers, including the Harvard-Smithsonian Center for Astrophysics, Wyss Institute for Biologically Inspired Engineering, and the Center for Brain Science.'
    },
    campusLife: {
      studentLife: 'Harvard\'s residential house system integrates academic, extracurricular, and social life. First-year students live in dormitories in or near Harvard Yard and eat in Annenberg Hall. Upperclassmen live in one of 12 residential houses, and most students live on campus for all four years.',
      athletics: 'Harvard competes in NCAA Division I athletics and the Ivy League. The school has an intense athletic rivalry with Yale University which culminates in The Game, an annual football competition. Harvard operates several athletic facilities including the Malkin Athletic Center, Lavietes Pavilion, and Harvard Stadium.'
    },
    notableAlumni: [
      { name: 'Barack Obama', description: 'Former US President' },
      { name: 'Mark Zuckerberg', description: 'Facebook founder' },
      { name: 'Bill Gates', description: 'Microsoft founder' },
      { name: 'John F. Kennedy', description: 'Former US President' },
      { name: 'Natalie Portman', description: 'Actress' }
    ],
    history: 'Harvard is the United States\' oldest institution of higher learning, established in 1636 by vote of the Great and General Court of the Massachusetts Bay Colony. It was initially called "New College" and was renamed Harvard College in 1639, after clergyman John Harvard bequeathed it his library and half of his estate. The first known official reference to Harvard as a "university" rather than a college was in 1780 in the Massachusetts Constitution. Throughout the 18th century, Enlightenment ideas of the power of reason and free will became widespread among Congregational ministers, putting those ministers and their congregations in tension with more traditionalist, Calvinist parties. During the American Civil War, Harvard sent more than 1,000 students and alumni to fight for the Union cause. The 20th century saw Harvard gradually rising to international prestige.'
  },
  // ... other colleges would be defined here
};

const CollegeProfileScreen = () => {
  const { width } = useWindowDimensions();
  const params = useLocalSearchParams();
  const collegeId = params.id as string || '1';
  const college = collegeData[collegeId];

  // Animation
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const statIconColor = '#A78BFA';
  const sectionCardStyle = {
    backgroundColor: 'rgba(246,243,255,0.85)',
    borderRadius: 22,
    padding: 22,
    marginBottom: 22,
    shadowColor: '#A78BFA',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.10,
    shadowRadius: 16,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#E9DFFC',
    backdropFilter: 'blur(8px)', // for web/glassmorphism
  };

  if (!college) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#f5f7fa' }}>
        <StatusBar barStyle="dark-content" />
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
          <Text style={{ fontSize: 18, color: '#333', textAlign: 'center', marginBottom: 20 }}>College not found</Text>
          <TouchableOpacity style={{ backgroundColor: '#A78BFA', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 8 }} onPress={() => router.back()}>
            <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold' }}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <LinearGradient colors={["#F8F0FF", "#F3F4F8"]} style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1, backgroundColor: 'transparent' }}>
        {/* Header with gradient and shadow */}
        <LinearGradient 
          colors={["#EDE4FF", "#F8F0FFDD"]} 
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{ paddingBottom: 10, paddingTop: 12, paddingHorizontal: 18, shadowColor: '#A78BFA', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.12, shadowRadius: 12, elevation: 6, borderBottomLeftRadius: 20, borderBottomRightRadius: 20 }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', paddingBottom: 8 }}>
            <TouchableOpacity 
              onPress={() => router.back()} 
              style={{ backgroundColor: '#FFFFFF99', borderRadius: 20, padding: 10, marginRight: 12, shadowColor: '#000000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 }}
            >
              <Ionicons name="arrow-back" size={28} color="#6D28D9" />
            </TouchableOpacity>
            <Image 
              source={{ uri: college.logo }} 
              style={{ width: 64, height: 64, borderRadius: 32, marginRight: 16, borderWidth: 3, borderColor: '#FFFFFFCC', shadowColor: '#A78BFA', shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.20, shadowRadius: 8 }} 
            />
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 26, fontWeight: 'bold', color: '#37315E', letterSpacing: 0.2 }}>{college.name}</Text>
              <Text style={{ color: '#7C3AED', fontSize: 16, marginTop: 3, fontWeight: '600' }}>{college.location}</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
                <Ionicons name="cube-outline" size={16} color="#A78BFA" style={{ marginRight: 6 }} />
                <Text style={{ color: '#6B7280', fontSize: 14 }}>{college.type}</Text>
              </View>
            </View>
          </View>
        </LinearGradient>
        <Animated.ScrollView contentContainerStyle={{ padding: 18, paddingBottom: 90 }} showsVerticalScrollIndicator={false} style={{ opacity: fadeAnim }}>
          {/* Quick Stats */}
          <View style={sectionCardStyle}>
            <Text style={{ fontWeight: 'bold', fontSize: 18, color: '#222', marginBottom: 18, letterSpacing: 0.1 }}>Quick Stats</Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
              <View style={{ alignItems: 'center', width: '30%', marginBottom: 18 }}>
                <Ionicons name="calendar-outline" size={32} color={statIconColor} />
                <Text style={{ fontWeight: 'bold', fontSize: 18, color: '#222', marginTop: 4 }}>{college.founded}</Text>
                <Text style={{ color: '#888', fontSize: 14 }}>Founded</Text>
              </View>
              <View style={{ alignItems: 'center', width: '30%', marginBottom: 18 }}>
                <Ionicons name="checkmark-circle-outline" size={32} color={statIconColor} />
                <Text style={{ fontWeight: 'bold', fontSize: 18, color: '#222', marginTop: 4 }}>{college.acceptanceRate}</Text>
                <Text style={{ color: '#888', fontSize: 14 }}>Acceptance</Text>
              </View>
              <View style={{ alignItems: 'center', width: '30%', marginBottom: 18 }}>
                <Ionicons name="people-outline" size={32} color={statIconColor} />
                <Text style={{ fontWeight: 'bold', fontSize: 18, color: '#222', marginTop: 4 }}>{college.facultyRatio}</Text>
                <Text style={{ color: '#888', fontSize: 14 }}>Faculty Ratio</Text>
              </View>
              <View style={{ alignItems: 'center', width: '30%', marginBottom: 8 }}>
                <Ionicons name="trending-up-outline" size={32} color={statIconColor} />
                <Text style={{ fontWeight: 'bold', fontSize: 18, color: '#222', marginTop: 4 }}>{college.nationalRank}</Text>
                <Text style={{ color: '#888', fontSize: 14 }}>National Rank</Text>
              </View>
              <View style={{ alignItems: 'center', width: '30%', marginBottom: 8 }}>
                <Ionicons name="school-outline" size={32} color={statIconColor} />
                <Text style={{ fontWeight: 'bold', fontSize: 18, color: '#222', marginTop: 4 }}>{college.undergrads.toLocaleString()}</Text>
                <Text style={{ color: '#888', fontSize: 14 }}>Undergrads</Text>
              </View>
              <View style={{ alignItems: 'center', width: '30%', marginBottom: 8 }}>
                <Ionicons name="person-outline" size={32} color={statIconColor} />
                <Text style={{ fontWeight: 'bold', fontSize: 18, color: '#222', marginTop: 4 }}>{college.graduates.toLocaleString()}</Text>
                <Text style={{ color: '#888', fontSize: 14 }}>Graduates</Text>
              </View>
            </View>
          </View>

          {/* About */}
          <View style={sectionCardStyle}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
              <Ionicons name="information-circle-outline" size={22} color={statIconColor} style={{ marginRight: 8 }} />
              <Text style={{ fontWeight: 'bold', fontSize: 17, color: '#222', letterSpacing: 0.1 }}>About</Text>
            </View>
            <Text style={{ color: '#333', fontSize: 16, lineHeight: 24 }}>{college.about}</Text>
          </View>

          {/* History */}
          {college.history && (
            <View style={sectionCardStyle}>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                <Ionicons name="time-outline" size={22} color={statIconColor} style={{ marginRight: 8 }} />
                <Text style={{ fontWeight: 'bold', fontSize: 17, color: '#222', letterSpacing: 0.1 }}>History</Text>
              </View>
              <Text style={{ color: '#333', fontSize: 16, lineHeight: 24 }}>{college.history}</Text>
            </View>
          )}

          {/* Admissions */}
          <View style={sectionCardStyle}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
              <Ionicons name="person-add-outline" size={22} color={statIconColor} style={{ marginRight: 8 }} />
              <Text style={{ fontWeight: 'bold', fontSize: 17, color: '#222', letterSpacing: 0.1 }}>Admissions</Text>
            </View>
            <Text style={{ fontWeight: 'bold', color: '#222', marginBottom: 2, fontSize: 15 }}>Requirements</Text>
            <Text style={{ color: '#333', fontSize: 15, marginBottom: 10 }}>{college.admissions.requirements}</Text>
            <Text style={{ fontWeight: 'bold', color: '#222', marginBottom: 2, fontSize: 15 }}>Tuition & Fees</Text>
            <View style={{ marginBottom: 10 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 2 }}>
                <Text style={{ color: '#888', fontWeight: 'bold', fontSize: 15 }}>Undergraduate Tuition</Text>
                <Text style={{ color: '#333', fontSize: 15 }}>{college.admissions.tuition.undergraduate}</Text>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 2 }}>
                <Text style={{ color: '#888', fontWeight: 'bold', fontSize: 15 }}>Graduate Tuition</Text>
                <Text style={{ color: '#333', fontSize: 15 }}>{college.admissions.tuition.graduate}</Text>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ color: '#888', fontWeight: 'bold', fontSize: 15 }}>Room & Board</Text>
                <Text style={{ color: '#333', fontSize: 15 }}>{college.admissions.tuition.roomBoard}</Text>
              </View>
            </View>
            <Text style={{ color: '#8B5CF6', fontWeight: 'bold', fontSize: 15 }}>Acceptance Rate: {college.acceptanceRate}</Text>
          </View>

          {/* Academics */}
          <View style={sectionCardStyle}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
              <Ionicons name="book-outline" size={22} color={statIconColor} style={{ marginRight: 8 }} />
              <Text style={{ fontWeight: 'bold', fontSize: 17, color: '#222', letterSpacing: 0.1 }}>Academics</Text>
            </View>
            <Text style={{ fontWeight: 'bold', color: '#222', marginBottom: 2, fontSize: 15 }}>Programs</Text>
            <Text style={{ color: '#333', fontSize: 15, marginBottom: 10 }}>{college.academics.programs}</Text>
            <Text style={{ fontWeight: 'bold', color: '#222', marginBottom: 2, fontSize: 15 }}>Popular Majors</Text>
            {college.academics.populatMajors.map((major: string, idx: number) => (
              <View key={idx} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
                <Ionicons name="checkmark-circle" size={18} color={statIconColor} style={{ marginRight: 8 }} />
                <Text style={{ color: '#333', fontSize: 15 }}>{major}</Text>
              </View>
            ))}
            <Text style={{ fontWeight: 'bold', color: '#222', marginTop: 10, marginBottom: 2, fontSize: 15 }}>Research</Text>
            <Text style={{ color: '#333', fontSize: 15 }}>{college.academics.research}</Text>
          </View>

          {/* Campus Life */}
          <View style={sectionCardStyle}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
              <Ionicons name="home-outline" size={22} color={statIconColor} style={{ marginRight: 8 }} />
              <Text style={{ fontWeight: 'bold', fontSize: 17, color: '#222', letterSpacing: 0.1 }}>Campus Life</Text>
            </View>
            <Text style={{ fontWeight: 'bold', color: '#222', marginBottom: 2, fontSize: 15 }}>Student Life</Text>
            <Text style={{ color: '#333', fontSize: 15, marginBottom: 10 }}>{college.campusLife.studentLife}</Text>
            <Text style={{ fontWeight: 'bold', color: '#222', marginBottom: 2, fontSize: 15 }}>Athletics</Text>
            <Text style={{ color: '#333', fontSize: 15 }}>{college.campusLife.athletics}</Text>
          </View>

          {/* Notable Alumni */}
          {college.notableAlumni && (
            <View style={sectionCardStyle}>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                <Ionicons name="star-outline" size={22} color={statIconColor} style={{ marginRight: 8 }} />
                <Text style={{ fontWeight: 'bold', fontSize: 17, color: '#222', letterSpacing: 0.1 }}>Notable Alumni</Text>
              </View>
              {college.notableAlumni.map((alum: {name: string, description: string}, idx: number) => (
                <View key={idx} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
                  <Ionicons name="person-outline" size={18} color={statIconColor} style={{ marginRight: 8 }} />
                  <Text style={{ color: '#333', fontSize: 15 }}>{alum.name} <Text style={{ color: '#888', fontSize: 15 }}>({alum.description})</Text></Text>
                </View>
              ))}
            </View>
          )}
        </Animated.ScrollView>
        {/* Floating Save Button */}
        <TouchableOpacity style={{ position: 'absolute', bottom: 28, right: 28, backgroundColor: '#A78BFA', borderRadius: 32, padding: 18, shadowColor: '#A78BFA', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.18, shadowRadius: 12, elevation: 8 }} activeOpacity={0.85} onPress={() => alert('Saved!')}>
          <Ionicons name="bookmark-outline" size={28} color="#fff" />
        </TouchableOpacity>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f0f0f0', // Light gray background for the whole page
  },
  pageContainer: {
    flex: 1,
    paddingTop: 20, // Give some space from the top
  },
  externalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Or 'center' if title is centered
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  headerTitleText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4A90E2', // Theme color
  },
  searchBarPlaceholder: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginHorizontal: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContentContainer: {
    paddingHorizontal: 20,
    paddingBottom: 30, // Ensure space at the bottom of scroll
  },
  contentCard: {
    backgroundColor: '#4A90E2', // Light blue background 
    borderRadius: 20,
    padding: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 5,
  },
  cardBackButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    backgroundColor: 'rgba(0,0,0,0.2)', // Slight dark background for visibility
    borderRadius: 15,
    width: 44, // Increased touch target
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10, // Ensure it's above other content
  },
  section: {
    marginBottom: 25,
    paddingTop: 50, // Add padding to make space for the back button
  },
  sectionTitle: {
    fontSize: 20, // Larger for section titles
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
  },
  sectionText: {
    fontSize: 16,
    color: '#FFFFFF',
    lineHeight: 24, // Improved readability
  },
  // Error state styles (if needed, or keep existing ones)
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  // Re-use existing back button style or a new one for error screen
  errorScreenBackButton: { // Renamed to avoid conflict if styles were merged
    backgroundColor: '#4A90E2',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  errorScreenBackButtonText: { // Renamed
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },

  // Keeping some of the original styles that might be useful or need merging/tweaking
  // Original styles for reference or if they are used by parts not touched:
  container: { // This was likely the old top-level container
    flex: 1,
    backgroundColor: '#fff', // Original was white
  },
  header: { // Original header, now replaced by externalHeader and cardBackButton
    // flexDirection: 'row',
    // alignItems: 'center',
    // paddingHorizontal: 15,
    // paddingVertical: 10,
    // borderBottomWidth: 1,
    // borderBottomColor: '#eee',
  },
  // backButton: { // Original back button, now cardBackButton (for inside card) and errorScreenBackButton
    // padding: 10,
  // },
  // scrollContent: { // Original scroll content, now scrollContentContainer
    // padding: 20,
  // },
  collegeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    // This whole block was for the old detailed header, not matching the new design.
  },
  collegeLogo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 15,
    borderWidth: 2,
    borderColor: '#eee',
  },
  collegeHeaderText: {
    flex: 1,
  },
  collegeName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  locationText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 5,
  },
  typeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  typeText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 5,
    flexShrink: 1, // Allow text to wrap
  },
  // section: { // Original section style, new one is more specific to the card
    // marginBottom: 25,
  // },
  sectionTitleContainer: { // Original, replaced by simpler sectionTitle
    // flexDirection: 'row',
    // alignItems: 'center',
    // marginBottom: 15,
  },
  // sectionTitle: { // Original section title, new one is simpler and white
    // fontSize: 20,
    // fontWeight: 'bold',
    // color: '#333',
    // marginLeft: 8,
  // },
  // sectionText: { // Original section text, new one is white
    // fontSize: 15,
    // color: '#555',
    // lineHeight: 22,
  // },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around', // Better distribution
    marginTop: 10,
  },
  statItem: {
    alignItems: 'center',
    width: '30%', // Adjust for 3 items per row approximately
    marginBottom: 20,
    paddingHorizontal: 5,
  },
  statIcon: {
    marginBottom: 8,
    color: '#E9746C', // Theme color for icons
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  statLabel: {
    fontSize: 12,
    color: '#777',
    marginTop: 2,
    textAlign: 'center',
  },
  subsectionTitle: {
    fontSize: 16,
    fontWeight: '600', // Semibold
    color: '#444',
    marginTop: 15,
    marginBottom: 8,
  },
  tuitionContainer: {
    marginTop: 5,
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
  },
  tuitionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
  },
  tuitionLabel: {
    fontSize: 14,
    color: '#555',
  },
  tuitionValue: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  acceptanceRate: {
    fontSize: 14,
    color: '#4A90E2', // Theme color
    fontWeight: 'bold',
    marginTop: 10,
  },
  majorsList: {
    marginTop: 5,
  },
  majorItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  majorText: {
    fontSize: 14,
    color: '#555',
    marginLeft: 8,
  },
  alumniCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  alumniName: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#333',
  },
  alumniDescription: {
    fontSize: 13,
    color: '#666',
    marginTop: 3,
  },
});

export default CollegeProfileScreen; 