import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Master from './components/Master';
import Home from './components/Home';
import AdminLogin from './components/admin/AdminLogin';
import Dashboard from './components/admin/Dashboard';
import AddTheme from './components/admin/theme/AddTheme';
import ManageTheme from './components/admin/theme/ManageTheme';
import EditTheme from './components/admin/theme/EditTheme';
import AddStory from './components/admin/story/AddStory';
import ManageStory from './components/admin/story/ManageStory';
import EditStory from './components/admin/story/EditStory';
import ManageFeedback from './components/admin/feedback/ManageFeedback';
import ManageReader from './components/admin/reader/ManageReader';
import ReaderRegister from './components/ReaderRegister';
import Themes from './components/Themes';
import AllStories from './components/AllStories';
import ReaderLogin from './components/ReaderLogin';
import StoryByTheme from './components/StoryByTheme';
import AddFeedback from './components/AddFeedback';
import SingleStory from './components/SingleStory';
import SaveLaterList from './components/SaveLaterList';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="" element={<Master />} >
            <Route path="" element={<Home />} />
            <Route path='/admin' element={<AdminLogin />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/addtheme' element={<AddTheme />} />
            <Route path='/managetheme' element={<ManageTheme />} />
            <Route path='/edittheme/:id' element={<EditTheme />} />
            <Route path='/addstory' element={<AddStory />} />
            <Route path='/managestory' element={<ManageStory />} />
            <Route path='/editstory/:id' element={<EditStory />} />
            <Route path='/managefeedback' element={<ManageFeedback />} />
            <Route path='/managereader' element={<ManageReader />} />
            <Route path='/readerregister' element={<ReaderRegister />} />
            <Route path='/themes' element={<Themes />} />
            <Route path='/all-stories' element={<AllStories />} />
            <Route path='/savelater-list' element={<SaveLaterList />} />
            <Route path='/story-by-theme/:theme' element={<StoryByTheme />} />
            <Route path='/singlestory/:id' element={<SingleStory />} />
            <Route path='/readerlogin' element={<ReaderLogin />} />
            <Route path='/addfeedback' element={<AddFeedback />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
