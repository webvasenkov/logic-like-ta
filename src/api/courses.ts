import { Course } from '../types/course.interface';

export async function getCourses(): Promise<Course[]> {
  const data = await fetch('https://logiclike.com/docs/courses.json');
  const courses = await data.json();

  return courses;
}
