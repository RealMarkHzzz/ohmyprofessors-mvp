const mockData = {
  professors: [
    {
      id: "sarah-jenkins",
      name: "Dr. Sarah Jenkins",
      title: "Senior Lecturer in Computer Science",
      university: "University of Melbourne",
      department: "School of Computing and Information Systems",
      rating: 4.8,
      difficulty: 4.2,
      sentiment: " 该教授给分慷慨，但作业量大。适合想学到真本事且不怕熬夜的学生。",
      tags: ["Generous Grading", "Heavy Workload", "Practical Skills"],
      gpaRisk: "Low",
      gpaRiskValue: 25,
      distribution: [10, 5, 45, 30, 10], // F, D, C, B, A
      summary: "Sarah is known for her deep industry knowledge in AI. While her assignments are time-consuming, the grading criteria are clear and she often awards high marks to those who put in the effort.",
      subjects: ["COMP90051 AI", "COMP30019 Graphics"],
    },
    {
      id: "michael-chen",
      name: "Prof. Michael Chen",
      title: "Professor of Finance",
      university: "University of Sydney",
      department: "USYD Business School",
      rating: 3.5,
      difficulty: 4.9,
      sentiment: "高GPA风险，讲课极具魅力。如果你追求深度理解而非仅仅是分数，他是最佳选择。",
      tags: ["High GPA Risk", "Engaging Lecturer", "Tough Exams"],
      gpaRisk: "High",
      gpaRiskValue: 85,
      distribution: [25, 30, 20, 15, 10],
      summary: "Michael brings Wall Street experience to the classroom. His exams are notoriously difficult and deviate from the textbook, requiring a high level of critical thinking.",
      subjects: ["FINC2011 Finance", "FINC3017 Portfolio"],
    },
    {
      id: "emily-wong",
      name: "Dr. Emily Wong",
      title: "Associate Professor of Cultural Studies",
      university: "University of Melbourne",
      department: "Faculty of Arts",
      rating: 4.9,
      difficulty: 2.5,
      sentiment: "充满热情，反馈详尽。她的课程是艺术系学生的心灵避风港，给分也非常友好。",
      tags: ["Enthusiastic", "Detailed Feedback", "Supportive"],
      gpaRisk: "Very Low",
      gpaRiskValue: 10,
      distribution: [2, 3, 15, 40, 40],
      summary: "Emily is beloved by students for her empathy and encouraging teaching style. She spends significant time on essay feedback, helping students improve their academic writing.",
      subjects: ["MULT20003 Media", "CRIT30001 Theory"],
    },
    {
      id: "david-smith",
      name: "Prof. David Smith",
      title: "Clinical Professor",
      university: "University of Sydney",
      department: "Sydney Medical School",
      rating: 4.2,
      difficulty: 4.5,
      sentiment: "严谨治学，临床专家。对专业度要求极高，虽然严厉，但能让你在最短时间内提升专业素养。",
      tags: ["Strict", "Expert Knowledge", "Professional"],
      gpaRisk: "Medium",
      gpaRiskValue: 55,
      distribution: [5, 15, 30, 35, 15],
      summary: "A world-renowned expert in surgery. David expects absolute precision and punctuality. His clinical rounds are challenging but invaluable for medical training.",
      subjects: ["MEDS4011 Surgery", "ANAT2008 Anatomy"],
    },
    {
      id: "alice-brown",
      name: "Dr. Alice Brown",
      title: "Senior Fellow in Law",
      university: "University of Melbourne",
      department: "Melbourne Law School",
      rating: 3.9,
      difficulty: 4.7,
      sentiment: "侧重案例分析，期末考极难。你需要对所有法律条文烂熟于心，没有捷径可走。",
      tags: ["Case-study Focused", "Hard Exams", "No Shortcuts"],
      gpaRisk: "High",
      gpaRiskValue: 78,
      distribution: [15, 20, 35, 20, 10],
      summary: "Alice's Socratic method teaching style keeps students on their toes. The final exam often constitutes 100% of the grade and is known for its complexity.",
      subjects: ["LAWS50024 Torts", "LAWS90031 Contracts"],
    }
  ],
  subjects: [
    { id: "comp90051", name: "COMP90051: Statistical Machine Learning", university: "UniMelb" },
    { id: "finc2011", name: "FINC2011: Corporate Finance I", university: "USYD" }
  ],
  universities: [
    { id: "unimelb", name: "University of Melbourne", location: "Melbourne, VIC" },
    { id: "usyd", name: "University of Sydney", location: "Sydney, NSW" }
  ]
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = mockData;
}
