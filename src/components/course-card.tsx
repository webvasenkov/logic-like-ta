import { Course } from '@/types/course.interface';

type Props = {
  course: Course;
};

function CourseCard({ course }: Props) {
  return (
    <div className='course-card'>
      <div
        className='course-card__image-cover'
        style={{ backgroundColor: course.bgColor }}>
        <img className='course-card__image' src={course.image} />
      </div>
      <h2 className='course-card__title'>{course.name}</h2>
    </div>
  );
}

export default CourseCard;
