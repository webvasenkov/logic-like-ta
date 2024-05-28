import { Dispatch, SetStateAction } from 'react';
import { Course } from '@/types/course.interface';
import { getCourses } from '@/api/courses';

type Props = {
  topics: string[];
  selectedTopic: string;
  setSelectedTopic: Dispatch<SetStateAction<string>>;
  setCourses: Dispatch<SetStateAction<[] | Course[]>>;
};

function Sidebar({
  topics,
  selectedTopic,
  setCourses,
  setSelectedTopic,
}: Props) {
  function handleClickOnSidebarButton(topic: string) {
    return async () => {
      if (topic == selectedTopic) {
        return;
      }

      let courses = await getCourses();

      if (topic != topics[0]) {
        courses = courses.filter((course) => course.tags.includes(topic));
      }

      setSelectedTopic(topic);
      setCourses(courses);
    };
  }

  return (
    <ul className='sidebar'>
      {topics.map((topic) => {
        const isSelectedTopic = topic == selectedTopic;

        return (
          <li>
            <button
              className={
                isSelectedTopic
                  ? 'sidebar__button sidebar__button-selected'
                  : 'sidebar__button'
              }
              onClick={handleClickOnSidebarButton(topic)}>
              {topic}
            </button>
          </li>
        );
      })}
    </ul>
  );
}

export default Sidebar;
