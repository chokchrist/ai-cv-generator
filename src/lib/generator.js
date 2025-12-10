export const generateCV = (text) => {
  // Mock AI generation - parses text for keywords or returns structured dummy data
  return {
    personalInfo: {
      name: "Alex Morgan",
      title: "Senior Software Engineer",
      email: "alex.morgan@example.com",
      phone: "+1 234 567 890",
      location: "San Francisco, CA",
      summary: text.slice(0, 150) + "..." // Use part of input as summary
    },
    experience: [
      {
        id: 1,
        role: "Senior Frontend Developer",
        company: "Tech Corp",
        period: "2021 - Present",
        description: "Leading the frontend team, migrating to React, improving performance by 40%."
      },
      {
        id: 2,
        role: "Web Developer",
        company: "Creative Agency",
        period: "2018 - 2021",
        description: "Built award-winning websites for high-profile clients using modern web technologies."
      }
    ],
    education: [
      {
        id: 1,
        degree: "B.S. Computer Science",
        school: "University of Technology",
        period: "2014 - 2018"
      }
    ],
    skills: ["React", "TypeScript", "Tailwind CSS", "Node.js", "UI/UX Design"]
  };
};
