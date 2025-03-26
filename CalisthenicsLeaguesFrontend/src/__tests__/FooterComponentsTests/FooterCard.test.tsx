import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { FooterCard } from "../../components/FooterComponents/FooterCard";

describe("FooterCard", () => {

    test("should render footer", () => {
        render(<FooterCard />);
        expect(screen.getByText('© 2025 All Rights Reserved.')).toBeInTheDocument();
        expect(screen.getByText('CALISTHENICS')).toBeInTheDocument();
    });

});