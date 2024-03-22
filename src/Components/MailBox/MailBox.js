import React from 'react'
import MailMenu from './MailMenu'
import authContext from '../Store/Context'
import { useContext } from 'react'
import SearchBar from './SearchBar'
import ComposeMail from './ComposeMail'
const MailBox = () => {


  return (
    <div>
      <SearchBar />
      <MailMenu />
      {visibleMail && <ComposeMail visible={visibleMail} />}
    </div>
  );
}

export default MailBox