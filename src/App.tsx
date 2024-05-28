import Sidebar from '@/components/sidebar';
import CourseCard from '@/components/course-card';
import { Course } from '@/types/course.interface';
import { useEffect, useState } from 'react';
import { getCourses } from '@/api/courses';

function App() {
  const [courses, setCourses] = useState<Course[] | []>([]);
  const [topics, setTopics] = useState<string[] | []>([]);
  const [selectedTopic, setSelectedTopic] = useState<string>('');

  useEffect(() => {
    async function setupCoursesData() {
      const data = await getCourses();
      const uniqueTags = new Set(data.map((course) => course.tags).flat());
      const topicsData = ['Все темы', ...uniqueTags];

      setTopics(topicsData);
      setSelectedTopic(topicsData[0]);
      setCourses(data);
    }

    setupCoursesData();
  }, []);

  return (
    <div className='main'>
      <Sidebar
        setCourses={setCourses}
        topics={topics}
        selectedTopic={selectedTopic}
        setSelectedTopic={setSelectedTopic}
      />
      <div className='main__courses'>
        {courses?.map((course) => <CourseCard course={course} />)}
      </div>
    </div>
  );
}

export default App;
