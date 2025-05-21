import { CardItem } from '../components/Card';

export const SAMPLE_CARDS: CardItem[] = [
  {
    id: 1,
    name: 'Harvard University',
    images: [
      'https://images.unsplash.com/photo-1639475377520-b256a5d204b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2000&q=80',
      'https://images.unsplash.com/photo-1625312029841-20880a67494a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2000&q=80',
      'https://images.unsplash.com/photo-1639475377443-8e1465fe424e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2000&q=80'
    ],
    location: 'Cambridge, Massachusetts',
    acceptanceRate: '4%',
    size: '6,700 students',
    tuition: '$55,000+ per year',
    overview: 'Harvard University is a private Ivy League research university in Cambridge, Massachusetts. Founded in 1636, it is the oldest institution of higher learning in the United States. Harvard consistently ranks among the top universities in the world and has produced many notable alumni, including eight U.S. presidents, 188 living billionaires, and numerous Nobel laureates.\n\nWith a $53.2 billion endowment, Harvard is the wealthiest academic institution in the world. The university operates several arts, cultural, and scientific museums, alongside the Harvard Library, which is the world\'s largest academic library system.\n\nThe Harvard campus occupies over 5,000 acres, with its main campus centered on Harvard Yard in Cambridge, about 3 miles northwest of downtown Boston. Harvard\'s athletic rivalry with Yale is intense in every sport in which they meet, coming to a climax each fall in the annual football meeting, which dates back to 1875.',
    popularMajors: ['Computer Science', 'Economics', 'Political Science', 'Biology', 'History', 'Psychology', 'Social Sciences', 'Mathematics'],
  },
  {
    id: 2,
    name: 'Stanford University',
    images: [
      'https://images.unsplash.com/photo-1628968417532-ad6c1deb5039?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2000&q=80',
      'https://images.unsplash.com/photo-1580330645688-1b99b6a60e01?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2000&q=80',
      'https://images.unsplash.com/photo-1582657118090-af35ade30102?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2000&q=80'
    ],
    location: 'Stanford, California',
    acceptanceRate: '4.3%',
    size: '7,645 students',
    tuition: '$56,169 per year',
    overview: 'Stanford University is a private research university in Stanford, California. Founded in 1885, it is known for its academic achievements, wealth, and proximity to Silicon Valley. Stanford is consistently ranked among the most prestigious universities in the world and has educated many notable leaders particularly in the business and technology sectors.',
    popularMajors: ['Computer Science', 'Engineering', 'Economics', 'Biology'],
  },
  {
    id: 3,
    name: 'MIT',
    images: [
      'https://images.unsplash.com/photo-1526675849333-83169c0dac49?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2000&q=80',
      'https://images.unsplash.com/photo-1595619481439-04df2b4e632f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2000&q=80',
      'https://images.unsplash.com/photo-1597600154160-7c6631d583d8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2000&q=80'
    ],
    location: 'Cambridge, Massachusetts',
    acceptanceRate: '4.1%',
    size: '4,530 students',
    tuition: '$55,510 per year',
    overview: 'The Massachusetts Institute of Technology (MIT) is a private land-grant research university in Cambridge, Massachusetts. Founded in 1861, MIT has played a significant role in the development of many areas of modern technology and science. MIT is widely regarded as one of the most prestigious universities in the world and has produced numerous notable alumni including 97 Nobel laureates.',
    popularMajors: ['Engineering', 'Computer Science', 'Mathematics', 'Physics'],
  },
  {
    id: 4,
    name: 'Yale University',
    images: [
      'https://images.unsplash.com/photo-1582639590011-f5a8416d1101?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2000&q=80',
      'https://images.unsplash.com/photo-1612909164290-dbd10ec6de32?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2000&q=80',
      'https://images.unsplash.com/photo-1574983509194-101dd9598a7b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2000&q=80'
    ],
    location: 'New Haven, Connecticut',
    acceptanceRate: '6.1%',
    size: '6,092 students',
    tuition: '$57,700 per year',
    overview: 'Yale University is a private Ivy League research university in New Haven, Connecticut. Founded in 1701, it is the third-oldest institution of higher education in the United States. Yale is known for its excellence in teaching and research, as well as its rich history. The university has produced many distinguished alumni, including five U.S. presidents and numerous heads of state around the world.',
    popularMajors: ['Economics', 'Political Science', 'History', 'Psychology'],
  },
  {
    id: 5,
    name: 'Princeton University',
    images: [
      'https://images.unsplash.com/photo-1569863959165-56dae551d4fc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2000&q=80',
      'https://images.unsplash.com/photo-1567580922256-bda53d01333e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2000&q=80',
      'https://images.unsplash.com/photo-1568736772245-26914aae0b09?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2000&q=80'
    ],
    location: 'Princeton, New Jersey',
    acceptanceRate: '5.8%',
    size: '5,428 students',
    tuition: '$54,070 per year',
    overview: 'Princeton University is a private Ivy League research university in Princeton, New Jersey. Founded in 1746, it is one of the oldest and most prestigious universities in the United States. Princeton emphasizes undergraduate education and offers highly selective admission to its strong liberal arts program. The university has graduated many notable alumni, including two U.S. presidents, Supreme Court justices, and business leaders.',
    popularMajors: ['Economics', 'Public Policy', 'Computer Science', 'History'],
  },
]; 