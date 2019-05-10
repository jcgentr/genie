import React from 'react';

const BuildDatabase = ({isSignedIn, onRouteChange}) => {
  return(
    <form className="pa4 black-80">
      <div className="mw5 mw7-ns center bg-light-gray pa3 ph5-ns tl">
        <span>Select file to upload: </span>
        <input type="file" name="fileToUpload" id="fileToUpload" className="pointer f5 link dim" />
        <input className="pointer f5 link dim ph3 pv2 mb2 dib white bg-light-purple" type="submit" value="Upload File" name="submit" /><br/><br/>
        <label htmlFor="name" className="f6 b db mb2">Database Name <span className="normal black-60">(optional)</span></label>
        <input id="name" className="ba b--black-20 pa2 mb2 db w-50" type="text" aria-describedby="name-desc" />
        <small id="name-desc" className="f6 black-60 db mb2">Helper text for the form control.</small>
      </div>
    </form>
  );
}
  
export default BuildDatabase;