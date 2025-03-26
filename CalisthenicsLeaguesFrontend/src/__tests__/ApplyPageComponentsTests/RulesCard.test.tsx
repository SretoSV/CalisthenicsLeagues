import '@testing-library/jest-dom'; //da bih prosirio expect sa dodatnim metodama za testiranje kao sto je toBeInTheDocument
import { describe, test, expect } from 'vitest';
import { render, screen } from "@testing-library/react";
import { RulesCard } from '../../components/ApplyPageComponents/RulesCard';

describe('RulesCard', () => {
    test('should render rules', () => {
        /*const result = */render(<RulesCard />);
        //expect(result.container).toMatchSnapshot();
        expect(screen.getByText('RULES:')).toBeInTheDocument();
    });

    test('should render rules2', () => {
        render(<RulesCard />);
        expect(screen.getByText(/RULE/)).toBeInTheDocument();
    });

    test('should render rules3', () => {
        render(<RulesCard />);
        const elements = screen.getAllByText(/r/);
        elements.forEach((element) => expect(element).toBeInTheDocument());
        //elements.forEach((element) => expect(element).not.toBeInTheDocument());
    });

    test("rendering without error", () => {
        render(<RulesCard />);
    });
});