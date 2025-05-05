const raiseUp = (navigate,Link,checker) => {
  if(checker) navigate(Link);
  setTimeout(() => {
    document.documentElement.scrollTop = 0;
  }, 1);
};

export default raiseUp;
