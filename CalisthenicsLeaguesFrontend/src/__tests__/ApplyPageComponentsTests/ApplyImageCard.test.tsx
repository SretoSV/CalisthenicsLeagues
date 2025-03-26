import '@testing-library/jest-dom';
import { describe, test, expect, vi, afterEach, beforeEach } from 'vitest';
import { render, screen } from "@testing-library/react";
import { ApplyImageCard } from '../../components/ApplyPageComponents/ApplyImageCard';
import { serverPath } from '../../functions/serverpath';
import { setLeagueIdByLeagueName } from '../../functions/formChangeFunction';
import { act } from 'react';


describe('ApplyImageCard', () => {
    beforeEach(() => {
        //vi.restoreAllMocks();
        /*const mockFetch = vi.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve(25), 
            })
        );

        vi.stubGlobal('fetch', mockFetch);
        morao bih ovo koristi ako ne bih imao prvi test i stubovanje 
        */

    });

    afterEach(() => {
        vi.restoreAllMocks(); // Resetuje sve mockove posle svakog testa
    });


    test("Rendered with the leagueName passed", async () => {
        
        const mockFetch = vi.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve(5), 
            })
        );

        vi.stubGlobal('fetch', mockFetch);

        await act(async () => {
            render(<ApplyImageCard leagueName="PremierLeague" />);
        });
    
        //console.log(mockFetch.mock.calls);
        console.log(mockFetch.mock.results);

        expect(screen.getByText("PremierLeague")).toBeInTheDocument();
        expect(screen.getByRole("img")).toHaveAttribute(
            "src",
            `${serverPath()}Images/Leagues/PremierLeague.png`
        );
        expect(screen.getByText("Members: 5")).toBeInTheDocument();
    });

    vi.mock('../../functions/formChangeFunction', () => ({
        setLeagueIdByLeagueName: vi.fn(() => 3),
    }));

    test("Calls setLeagueIdByLeagueName with the correct leagueName", async () => {
        await act(async () => {
            render(<ApplyImageCard leagueName="PremierLeague" />);
        });
        
        expect(setLeagueIdByLeagueName).toHaveBeenCalledWith("PremierLeague");
    });    
    
    test("Poziva fetch i postavlja broj članova nakon dobijanja podataka", async () => {
        const mockFetch = vi.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve(25), 
            })
        );
        
        vi.stubGlobal('fetch', mockFetch);
        
        
        //render(<ApplyImageCard leagueName="PremierLeague" />);
        await act(async () => {
            render(<ApplyImageCard leagueName="PremierLeague" />);
        });
        
        console.log(mockFetch.mock.results);
        
        expect(screen.getByText("Members: 25")).toBeInTheDocument();
        //expect(await screen.findByText("Members: 25")).toBeInTheDocument();
        //koristim findByText jer on ceka da se element pojavi u DOM, sto je korisno kod
        //asinhronih azuriranja, a getByText trazi element odmah i baca gresku ako ga nema
        
        expect(fetch).toHaveBeenCalledWith(
            `${serverPath()}League/members/number/3`,
            expect.objectContaining({
                method: 'GET',
            })
        );
    });


    test("If the fetch fails, the number of members remains 0", async () => {
        vi.stubGlobal('fetch', vi.fn(() =>
            Promise.resolve({ ok: false })
        ));
    
        render(<ApplyImageCard leagueName="PremierLeague" />);
        
        expect(await screen.findByText("Members: 0")).toBeInTheDocument();
    });

});
