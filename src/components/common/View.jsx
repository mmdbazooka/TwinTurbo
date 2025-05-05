const View = ({id,htmlFor,defaultChecked,src ,onInput}) => {
    return (
        <>
            <input type="radio" name="r" id={id} defaultChecked={defaultChecked} onInput={onInput}/>
            <label htmlFor={htmlFor}>
                <img src={"../src/assets/images/icons/" + src} alt="" />
            </label>
        </>
    );
};

export default View;
