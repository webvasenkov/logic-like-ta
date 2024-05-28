import Sidebar from '@/components/sidebar';
import CourseCard from '@/components/course-card';
import { Course } from '@/types/course.interface';
import { FidgetSpinner } from 'react-loader-spinner';
import { useEffect, useState } from 'react';
import { getCourses } from '@/api/courses';

function App() {
  const [isLoadedCourses, setIsLoadedCourses] = useState(false);
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
      setIsLoadedCourses(true);
    }

    setupCoursesData();
  }, []);

  if (!isLoadedCourses) {
    return (
      <div className='loader'>
        <FidgetSpinner />
      </div>
    );
  }

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
