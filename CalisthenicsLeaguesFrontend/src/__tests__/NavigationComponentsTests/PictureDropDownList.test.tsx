import { render, screen, fireEvent } from '@testing-library/react';
import { describe, test, vi, expect } from 'vitest';
import { PictureDropDownList } from '../../components/NavigationComponents/PictureDropDownList';
import { useUserContext } from '../../context/UserContext';

// Mock the useUserContext to simulate the user data
vi.mock('../../context/UserContext', () => ({
  useUserContext: vi.fn(),
}));

vi.mock('react-router-dom', () => ({
    useNavigate: vi.fn(),
}));

describe('PictureDropDownList Component', () => {

    vi.mocked(useUserContext).mockReturnValue({
        user: {
            id: 1,
            username: "testUser",
            name: "Test",
            surname: "User",
            email: "test@user.com",
            country: "Serbia",
            dateOfBirth: "2000-01-01",
            instagram: "@testuser",
            image: "image.png",
            league: 1,
            accepted: true,
            admin: false,
        },
        login: vi.fn(),
        logout: vi.fn(),
        setUser: vi.fn(),
    });

    test('renders the correct user name', () => {

        render(<PictureDropDownList />);

        const usernameElement = screen.getByText('testUser');
        expect(usernameElement).toBeInTheDocument();
    });

    test('renders the correct profile image', () => {
        render(<PictureDropDownList />);

        const profileImageElement = screen.getByAltText('ProfilePicture');
        expect(profileImageElement).toHaveAttribute('src', expect.stringContaining('image.png'));
    });

    test('opens the dropdown when the profile image is clicked', () => {
        render(<PictureDropDownList />);
                
        const imageIcon = screen.getByAltText('ProfilePicture');
        fireEvent.click(imageIcon);
        
        const dropdown = screen.getByTestId('drop-down-list-card');
        expect(dropdown).toBeInTheDocument();
    });

    test('closes the dropdown when clicking outside', () => {
        render(<PictureDropDownList />);

        const profileImageElement = screen.getByAltText('ProfilePicture');
        fireEvent.click(profileImageElement);

        const dropdown = screen.getByTestId('drop-down-list-card');
        expect(dropdown).toBeInTheDocument();

        fireEvent.click(document);
        expect(dropdown).not.toBeInTheDocument();
    });

    test('does not show dropdown initially', () => {
        render(<PictureDropDownList />);

        const dropdown = screen.queryByTestId('drop-down-list-card');
        expect(dropdown).not.toBeInTheDocument();
    });
});