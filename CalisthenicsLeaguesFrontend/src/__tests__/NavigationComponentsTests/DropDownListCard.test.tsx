import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import { DropDownListCard } from '../../components/NavigationComponents/DropDownListCard';
import { useUserContext } from '../../context/UserContext';
import { serverPath } from '../../functions/serverpath';
import { useNavigate } from 'react-router-dom';


vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn(),
}));

vi.mock('../../context/UserContext', () => ({
  useUserContext: vi.fn(),
}));

vi.stubGlobal('fetch', vi.fn());

describe("DropDownListCard", () => {
    const mockNavigate = vi.fn();
    vi.mocked(useNavigate).mockReturnValue(
        mockNavigate
    );

    const mockLogout = vi.fn();
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
        logout: mockLogout,
        setUser: vi.fn(),
    });

    test('should render links', () => {
        render(<DropDownListCard />);

        expect(screen.getByText('Edit profile')).toBeInTheDocument();
        expect(screen.getByText('Logout')).toBeInTheDocument();
    });

    test('should handle fetch error in logout', async () => {
        vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false }));

        render(<DropDownListCard />);

        const logoutButton = screen.getByText('Logout');
        fireEvent.click(logoutButton);

        await waitFor(() => {
            expect(mockLogout).not.toHaveBeenCalled();
            expect(mockNavigate).not.toHaveBeenCalled();
        });

        expect(fetch).toHaveBeenCalledWith(`${serverPath()}User/logout`, expect.objectContaining({
            method: 'POST',
            credentials: 'include',
        }));
    });

    test('should call handleLogout on logout click', async () => {
        vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true }));

        render(<DropDownListCard />);

        const logoutButton = screen.getByText('Logout');
        fireEvent.click(logoutButton);
        
        await waitFor(() => {
            expect(mockLogout).toHaveBeenCalledTimes(1);

            expect(mockNavigate).toHaveBeenCalledWith('/LeaguesPage');
        });
        
        expect(fetch).toHaveBeenCalledWith(`${serverPath()}User/logout`, expect.objectContaining({
            method: 'POST',
            credentials: 'include',
        }));

    });

});