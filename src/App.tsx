import './App.css';
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import { ProtectedLayout } from "./layouts/ProtectedLayout";
import { PublicLayout } from "./layouts/PublicLayout";
import { Provider } from 'react-redux';
import { store } from './store/store';
import TrackList from './components/TrackList';
import MuiLogin from './pages/MuiLogin';
import Dashboard from './pages/Dashboard';
import ContentGrid from './components/ContentGrid';
import ArtistList from './components/ArtistList';
import AlbumList from './components/AlbumList';
import AccountList from './components/AccountList';

export default function App() {
	return (
		<Provider store={store}>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<PublicLayout />}>
						<Route path="login" element={<MuiLogin />} />
					</Route>
					<Route path="/" element={<ProtectedLayout />}>
						<Route index element={<Navigate to="/dashboard" />} />
						<Route path="dashboard" element={<Dashboard />}>
							<Route index element={<ContentGrid />} />
							<Route path="tracks" element={<TrackList />} />
							<Route path="artists" element={<ArtistList />} />
							<Route path="albums" element={<AlbumList />} />
							<Route path="accounts" element={<AccountList />} />
						</Route>
					</Route>
				</Routes>
			</BrowserRouter>
		</Provider>
	);
}
