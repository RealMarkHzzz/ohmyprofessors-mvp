import { Review } from '../types';

/**
 * Mock Reviews for professors
 * Sample reviews across different professors and courses
 */
export const mockReviews: Review[] = [
  // Reviews for Dr. Sarah Chen (Computer Science)
  {
    id: 'r1',
    professor_id: '1',
    user_id: null,
    rating: 5,
    difficulty: 4,
    course_code: 'CS3310',
    course_name: 'Machine Learning',
    content: 'Dr. Chen is absolutely brilliant! Her lectures are engaging and she explains complex ML concepts in a way that\'s easy to understand. The assignments are challenging but fair.',
    tags: ['Clear Explanations', 'Helpful', 'Amazing Lectures'],
    helpful_count: 45,
    semester: '2025 Semester 2',
    would_take_again: true,
    attendance_mandatory: true,
    created_at: '2026-01-15T10:30:00Z',
    updated_at: '2026-01-15T10:30:00Z',
  },
  {
    id: 'r2',
    professor_id: '1',
    user_id: null,
    rating: 5,
    difficulty: 4,
    course_code: 'CS4420',
    course_name: 'Deep Learning',
    content: 'Best professor I\'ve had at Adelaide. She genuinely cares about student success and is always available for help. Her research background makes the course content cutting-edge.',
    tags: ['Engaging', 'Helpful', 'Available'],
    helpful_count: 38,
    semester: '2025 Semester 1',
    would_take_again: true,
    attendance_mandatory: false,
    created_at: '2025-11-20T14:22:00Z',
    updated_at: '2025-11-20T14:22:00Z',
  },
  {
    id: 'r3',
    professor_id: '1',
    user_id: null,
    rating: 4,
    difficulty: 3,
    course_code: 'CS3310',
    course_name: 'Machine Learning',
    content: 'Great course overall. The workload is heavy but you learn a ton. Just make sure you keep up with the weekly coding assignments.',
    tags: ['Lots of Homework', 'Clear Explanations'],
    helpful_count: 22,
    semester: '2024 Semester 2',
    would_take_again: true,
    attendance_mandatory: true,
    created_at: '2025-08-10T09:15:00Z',
    updated_at: '2025-08-10T09:15:00Z',
  },

  // Reviews for Prof. Michael Anderson (Computer Science)
  {
    id: 'r4',
    professor_id: '2',
    user_id: null,
    rating: 5,
    difficulty: 3,
    course_code: 'CS2510',
    course_name: 'Software Engineering',
    content: 'Prof. Anderson brings real-world industry experience to the classroom. His stories from Google and Microsoft make the course relatable. Easy grader if you put in the effort.',
    tags: ['Easy Grader', 'Helpful', 'Clear Explanations'],
    helpful_count: 56,
    semester: '2025 Semester 2',
    would_take_again: true,
    attendance_mandatory: false,
    created_at: '2026-01-08T11:45:00Z',
    updated_at: '2026-01-08T11:45:00Z',
  },
  {
    id: 'r5',
    professor_id: '2',
    user_id: null,
    rating: 4,
    difficulty: 3,
    course_code: 'CS3520',
    course_name: 'Agile Development',
    content: 'Very practical course with group projects. Anderson gives detailed feedback on code reviews. Some lectures can be a bit dry though.',
    tags: ['Gives Good Feedback', 'Fair Grader'],
    helpful_count: 31,
    semester: '2025 Semester 1',
    would_take_again: true,
    attendance_mandatory: true,
    created_at: '2025-10-15T16:30:00Z',
    updated_at: '2025-10-15T16:30:00Z',
  },

  // Reviews for Dr. Emily Watson (Computer Science)
  {
    id: 'r6',
    professor_id: '3',
    user_id: null,
    rating: 5,
    difficulty: 4,
    course_code: 'CS4230',
    course_name: 'Cybersecurity',
    content: 'Dr. Watson is phenomenal! Her lectures are incredibly well-structured. The exams are tough but fair. If you attend class and do the practice problems, you\'ll be fine.',
    tags: ['Amazing Lectures', 'Tough Grader', 'Helpful'],
    helpful_count: 67,
    semester: '2025 Semester 2',
    would_take_again: true,
    attendance_mandatory: true,
    created_at: '2026-01-22T13:20:00Z',
    updated_at: '2026-01-22T13:20:00Z',
  },
  {
    id: 'r7',
    professor_id: '3',
    user_id: null,
    rating: 5,
    difficulty: 4,
    course_code: 'CS3240',
    course_name: 'Cryptography',
    content: 'Won the Teaching Excellence Award for a reason. Super passionate about the subject and it shows. Definitely challenging but you learn so much.',
    tags: ['Respected', 'Engaging', 'Clear Explanations'],
    helpful_count: 44,
    semester: '2024 Semester 2',
    would_take_again: true,
    attendance_mandatory: true,
    created_at: '2025-07-30T10:10:00Z',
    updated_at: '2025-07-30T10:10:00Z',
  },

  // Reviews for Dr. David Liu (Computer Science)
  {
    id: 'r8',
    professor_id: '4',
    user_id: null,
    rating: 4,
    difficulty: 5,
    course_code: 'CS2220',
    course_name: 'Algorithms and Data Structures',
    content: 'This course will kick your butt, but you\'ll come out a much better programmer. Dr. Liu is tough but fair. The homework is A LOT but it\'s necessary.',
    tags: ['Tough Grader', 'Lots of Homework', 'Respected'],
    helpful_count: 89,
    semester: '2025 Semester 1',
    would_take_again: true,
    attendance_mandatory: true,
    created_at: '2025-11-05T15:40:00Z',
    updated_at: '2025-11-05T15:40:00Z',
  },
  {
    id: 'r9',
    professor_id: '4',
    user_id: null,
    rating: 5,
    difficulty: 5,
    course_code: 'CS3220',
    course_name: 'Advanced Algorithms',
    content: 'Best algorithms prof. Coached our team to ICPC finals. If you want to work at FAANG, take his course. Prepare to work hard though.',
    tags: ['Clear Explanations', 'Respected', 'Skip Class? You Won\'t Pass'],
    helpful_count: 72,
    semester: '2024 Semester 2',
    would_take_again: true,
    attendance_mandatory: true,
    created_at: '2025-08-18T09:25:00Z',
    updated_at: '2025-08-18T09:25:00Z',
  },

  // Reviews for Dr. Olivia Martinez (Computer Science)
  {
    id: 'r10',
    professor_id: '7',
    user_id: null,
    rating: 5,
    difficulty: 2,
    course_code: 'CS3150',
    course_name: 'Human-Computer Interaction',
    content: 'Literally the best class I\'ve taken. Dr. Martinez is so enthusiastic and her design background from Apple shows. The projects are fun and the grading is super lenient.',
    tags: ['Easy Grader', 'Engaging', 'Amazing Lectures', 'Light Workload'],
    helpful_count: 103,
    semester: '2025 Semester 2',
    would_take_again: true,
    attendance_mandatory: false,
    created_at: '2026-01-28T12:15:00Z',
    updated_at: '2026-01-28T12:15:00Z',
  },
  {
    id: 'r11',
    professor_id: '7',
    user_id: null,
    rating: 5,
    difficulty: 3,
    course_code: 'CS4150',
    course_name: 'UX Design',
    content: 'So much fun! The course is project-based and you get to build actual apps. Dr. Martinez provides excellent feedback. Highly recommend!',
    tags: ['Helpful', 'Gives Good Feedback', 'Engaging'],
    helpful_count: 91,
    semester: '2025 Semester 1',
    would_take_again: true,
    attendance_mandatory: false,
    created_at: '2025-10-20T14:50:00Z',
    updated_at: '2025-10-20T14:50:00Z',
  },

  // Reviews for Prof. Margaret Williams (Mathematics)
  {
    id: 'r12',
    professor_id: '11',
    user_id: null,
    rating: 4,
    difficulty: 5,
    course_code: 'MATH3210',
    course_name: 'Abstract Algebra',
    content: 'Not an easy A by any means. Prof. Williams is brilliant but expects a lot from students. If you love pure math, you\'ll enjoy this. Otherwise, be prepared to struggle.',
    tags: ['Tough Grader', 'Heavy Workload', 'Respected'],
    helpful_count: 65,
    semester: '2025 Semester 1',
    would_take_again: false,
    attendance_mandatory: true,
    created_at: '2025-11-12T10:30:00Z',
    updated_at: '2025-11-12T10:30:00Z',
  },
  {
    id: 'r13',
    professor_id: '11',
    user_id: null,
    rating: 3,
    difficulty: 5,
    course_code: 'MATH4210',
    course_name: 'Advanced Algebra',
    content: 'Extremely challenging course. The lectures are dense and move fast. Prof. Williams knows her stuff but isn\'t the best at explaining to beginners. Skip class at your own risk.',
    tags: ['Skip Class? You Won\'t Pass', 'Heavy Workload'],
    helpful_count: 48,
    semester: '2024 Semester 2',
    would_take_again: false,
    attendance_mandatory: true,
    created_at: '2025-07-22T16:10:00Z',
    updated_at: '2025-07-22T16:10:00Z',
  },

  // Reviews for Dr. Jessica Lee (Mathematics)
  {
    id: 'r14',
    professor_id: '13',
    user_id: null,
    rating: 5,
    difficulty: 3,
    course_code: 'MATH2310',
    course_name: 'Statistics',
    content: 'Dr. Lee makes stats actually interesting! Her online course is also amazing. Exams are fair and she gives practice problems that are very similar to the actual test.',
    tags: ['Amazing Lectures', 'Clear Explanations', 'Easy Grader'],
    helpful_count: 126,
    semester: '2025 Semester 2',
    would_take_again: true,
    attendance_mandatory: false,
    created_at: '2026-02-01T11:20:00Z',
    updated_at: '2026-02-01T11:20:00Z',
  },
  {
    id: 'r15',
    professor_id: '13',
    user_id: null,
    rating: 5,
    difficulty: 3,
    course_code: 'MATH3320',
    course_name: 'Probability Theory',
    content: 'Great professor! Always helpful in office hours. The course material is well-organized and her teaching style is engaging.',
    tags: ['Helpful', 'Clear Explanations', 'Available'],
    helpful_count: 87,
    semester: '2025 Semester 1',
    would_take_again: true,
    attendance_mandatory: false,
    created_at: '2025-10-28T13:45:00Z',
    updated_at: '2025-10-28T13:45:00Z',
  },

  // Reviews for Dr. Daniel White (Mathematics)
  {
    id: 'r16',
    professor_id: '16',
    user_id: null,
    rating: 5,
    difficulty: 4,
    course_code: 'MATH1120',
    course_name: 'Calculus I',
    content: 'Dr. White is an incredible teacher. He won teaching awards for a reason. His lectures are crystal clear and he uses great real-world examples.',
    tags: ['Amazing Lectures', 'Clear Explanations', 'Helpful'],
    helpful_count: 142,
    semester: '2025 Semester 2',
    would_take_again: true,
    attendance_mandatory: true,
    created_at: '2026-01-18T09:30:00Z',
    updated_at: '2026-01-18T09:30:00Z',
  },
  {
    id: 'r17',
    professor_id: '16',
    user_id: null,
    rating: 5,
    difficulty: 3,
    course_code: 'MATH2130',
    course_name: 'Calculus II',
    content: 'Made calc actually enjoyable. Dr. White is engaging and genuinely wants students to succeed. Grading is very fair.',
    tags: ['Engaging', 'Fair Grader', 'Gives Good Feedback'],
    helpful_count: 98,
    semester: '2024 Semester 2',
    would_take_again: true,
    attendance_mandatory: false,
    created_at: '2025-08-05T15:20:00Z',
    updated_at: '2025-08-05T15:20:00Z',
  },

  // Reviews for Dr. Elizabeth Scott (Engineering)
  {
    id: 'r18',
    professor_id: '25',
    user_id: null,
    rating: 5,
    difficulty: 3,
    course_code: 'ENGR3410',
    course_name: 'Environmental Engineering',
    content: 'Dr. Scott is passionate about sustainability and it\'s infectious. The course is well-designed and the group project was super interesting. Easy grader if you put in effort.',
    tags: ['Amazing Lectures', 'Engaging', 'Easy Grader'],
    helpful_count: 76,
    semester: '2025 Semester 1',
    would_take_again: true,
    attendance_mandatory: false,
    created_at: '2025-11-15T10:40:00Z',
    updated_at: '2025-11-15T10:40:00Z',
  },
  {
    id: 'r19',
    professor_id: '25',
    user_id: null,
    rating: 5,
    difficulty: 4,
    course_code: 'ENGR4420',
    course_name: 'Renewable Energy Systems',
    content: 'Fantastic course! Dr. Scott brings in industry speakers and the material is cutting-edge. You\'ll learn practical skills for the green energy transition.',
    tags: ['Helpful', 'Gives Good Feedback', 'Respected'],
    helpful_count: 63,
    semester: '2024 Semester 2',
    would_take_again: true,
    attendance_mandatory: true,
    created_at: '2025-07-12T14:10:00Z',
    updated_at: '2025-07-12T14:10:00Z',
  },

  // Reviews for Dr. Nancy Adams (Engineering)
  {
    id: 'r20',
    professor_id: '27',
    user_id: null,
    rating: 5,
    difficulty: 3,
    course_code: 'ENGR3610',
    course_name: 'Biomedical Engineering',
    content: 'Dr. Adams is the best! Her lectures are like TED talks - super engaging and informative. The course is fascinating and the workload is very manageable.',
    tags: ['Amazing Lectures', 'Easy Grader', 'Helpful', 'Light Workload'],
    helpful_count: 118,
    semester: '2025 Semester 2',
    would_take_again: true,
    attendance_mandatory: false,
    created_at: '2026-01-25T12:00:00Z',
    updated_at: '2026-01-25T12:00:00Z',
  },
];

/**
 * Get all reviews
 */
export function getAllReviews(): Review[] {
  return mockReviews;
}

/**
 * Get reviews by professor ID
 */
export function getReviewsByProfessorId(professorId: string): Review[] {
  return mockReviews.filter(review => review.professor_id === professorId);
}

/**
 * Get review by ID
 */
export function getReviewById(id: string): Review | undefined {
  return mockReviews.find(review => review.id === id);
}

/**
 * Add a new review (in-memory only for MVP)
 */
export function addReview(review: Omit<Review, 'id' | 'created_at' | 'updated_at' | 'helpful_count'>): Review {
  const newReview: Review = {
    ...review,
    id: `r${mockReviews.length + 1}`,
    helpful_count: 0,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
  
  mockReviews.push(newReview);
  return newReview;
}

/**
 * Get average rating for a professor
 */
export function getAverageRating(professorId: string): number {
  const reviews = getReviewsByProfessorId(professorId);
  if (reviews.length === 0) return 0;
  
  const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
  return Math.round((sum / reviews.length) * 10) / 10;
}

/**
 * Get rating distribution for a professor
 */
export function getRatingDistribution(professorId: string): { [key: number]: number } {
  const reviews = getReviewsByProfessorId(professorId);
  const distribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  
  reviews.forEach(review => {
    distribution[review.rating as keyof typeof distribution]++;
  });
  
  return distribution;
}

// Ensure data is available in production
export default mockReviews;
