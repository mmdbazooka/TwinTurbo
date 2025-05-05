const FooterTop = ({ content , src , className }) => {
  return (
    <div className={className}>
        <img src={"../src/assets/images/footer/" + src + ".png"} alt="" />
        <p>{content}</p>
    </div>
  )
}

export default FooterTop