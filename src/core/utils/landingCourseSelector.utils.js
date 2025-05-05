import { setCurItem } from "../../components/landing/CoursesLanding";
import customAxios from "../services/interceptor";

const landingCourseSelector = async (e,landingCourse,setCourseId) => {
    let result = await customAxios.get("/Home/GetCoursesTop?Count=3")
    let num = e.target.getAttribute("data-id")
    let courseMapId = e.target.getAttribute("data-courseid")
    
    setTimeout(() => {
        setCurItem(result[num])

        landingCourse.setAttribute("data-courseid",courseMapId)
        setCourseId(landingCourse.getAttribute("data-courseid"))
    }, 100);

}

export default landingCourseSelector