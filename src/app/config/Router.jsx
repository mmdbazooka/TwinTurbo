import { createBrowserRouter } from "react-router-dom";
import {Landing,ForgetPassword,Login,ContactUs,Blogs,SelectedBlog,Courses,SelectedCourse,Page404, Register , Panel ,ListOfCourse,Mycourse,EditProfile,DashBoard,ChangePassword} from '../../screens'

const Authorize = createBrowserRouter([
    {
      path: "/",
      element: <Landing />,
    },
    {
      path: "/forgetPassword/:ConfigValue",
      element: <ForgetPassword />,
    },
    {
      path: "/contact-us",
      element: <ContactUs />,
    },
    {
      path: "/blogs",
      element: <Blogs />,
    },
    {
      path: "/blogs/:id",
      element: <SelectedBlog />,
    },
    {
      path: "/courses",
      element: <Courses />,
    },
    {
      path: "/courses/:id",
      element: <SelectedCourse />,
    },
    {
      path: "/panel",
      element: <Panel /> ,
      
      children : [
        {
          path : "/panel/ListOfCourse",
          element : <Mycourse s1="قیمت" s2="اخرین تغیرات" s3="وضعیت" s4="سطح" s5="نام استاد" s6="نام دوره"/>,
        },
        {
          path : "/panel/editprofile",
          element : <EditProfile/>,
        },
        {
          path : "/panel",
          element : <DashBoard/>,
        },
        {
          path : "/panel/userpanel",
          element : <DashBoard/>,
        },
        {
          path : "/panel/reserveCourse",
          element : <Mycourse classNameSpans="[&>span:nth-child(3)]:mr-[-140px] [&>span:nth-child(2)]:mr-[60px] [&>span:nth-child(6)]:mr-[120px] pl-[85px]" s2="اخرین تغیرات" s3="وضعیت"  s6="نام دوره"/>,
        },
        {
          path : "/panel/favoriteCourse",
          element : <Mycourse classNameSpans="pr-[60px] [&>span:nth-child(4)]:pr-[25px] [&>span:nth-child(5)]:pr-[25px] [&>span:nth-child(6)]:pr-[25px]" s2="اخرین تغیرات" s3="وضعیت" s4="سطح" s5="نام استاد" s6="نام دوره"/>,
        },
        {
          path : "/panel/favoriteNews",
          element : <Mycourse classNameSpans="pr-[85px] [&>span:nth-child(6)]:ml-[20px]" s2="امتیاز" s3="اخرین تغیرات" s4="تعداد لایک" s5="بازدید" s6="نام اخبار"/>,
        },
        {
          path : "/panel/changePassword",
          element : <ChangePassword/>,
        },
      ]
    },
    {
      path: "*",
      element: <Page404 />,
    },

]);

const UnAuthorize = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/forgetPassword/:ConfigValue",
    element: <ForgetPassword />,
  },
  {    // when the forget page was optional the 404 page didn`t worked when we write anything in url
    path: "/forgetPassword",
    element: <ForgetPassword />,
  },
  {
    path: "/sign-in",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/contact-us",
    element: <ContactUs />,
  },
  {
    path: "/blogs",
    element: <Blogs />,
  },
  {
    path: "/blogs/:id",
    element: <SelectedBlog />,
    errorElement : <Page404 />,
  },
  {
    path: "/courses",
    element: <Courses />,
  },
  {
    path: "/courses/:id",
    element: <SelectedCourse />,
    errorElement : <Page404 />,
  },
  {
    path: "*",
    element: <Page404 />,
  },

]);

export { Authorize , UnAuthorize }