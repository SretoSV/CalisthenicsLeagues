import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { MessageOptionCard } from "../../components/ChatPageComponents/MessageOptionCard";
import socket from "../../sockets/socket";

describe("MessageOptionCard", () => {
    test("renders all buttons when isEditAndDeleteVisible is true", () => {
        render(<MessageOptionCard 
            id={1} 
            onChange={vi.fn()} 
            onMessageToReply={vi.fn()} 
            onEdit={vi.fn()} 
            isEditAndDeleteVisible={true} 
        />);
    
        expect(screen.getByText("Edit")).toBeInTheDocument();
        expect(screen.getByText("Reply")).toBeInTheDocument();
        expect(screen.getByText("Delete")).toBeInTheDocument();
    });

    test("renders only 'Reply' button when isEditAndDeleteVisible is false", () => {
        render(<MessageOptionCard 
            id={1} 
            onChange={vi.fn()} 
            onMessageToReply={vi.fn()} 
            onEdit={vi.fn()} 
            isEditAndDeleteVisible={false} 
        />);
    
        expect(screen.getByText("Reply")).toBeInTheDocument();
        expect(screen.queryByText("Edit")).not.toBeInTheDocument();
        expect(screen.queryByText("Delete")).not.toBeInTheDocument();
    });

    test("calls onEdit with correct id when 'Edit' button is clicked", () => {
        const mockOnEdit = vi.fn();
        
        render(<MessageOptionCard 
            id={5} 
            onChange={vi.fn()} 
            onMessageToReply={vi.fn()} 
            onEdit={mockOnEdit} 
            isEditAndDeleteVisible={true} 
        />);
    
        fireEvent.click(screen.getByText("Edit"));
        expect(mockOnEdit).toHaveBeenCalledWith(5);
    });

    test("calls onMessageToReply with correct id when 'Reply' button is clicked", () => {
        const mockOnMessageToReply = vi.fn();
        
        render(<MessageOptionCard 
            id={7} 
            onChange={vi.fn()} 
            onMessageToReply={mockOnMessageToReply} 
            onEdit={vi.fn()} 
            isEditAndDeleteVisible={true} 
        />);
    
        fireEvent.click(screen.getByText("Reply"));
        expect(mockOnMessageToReply).toHaveBeenCalledWith(7);
    });

    vi.mock("../../sockets/socket", () => ({
        default: {
            invoke: vi.fn(),
        },
    }));
    
    test("calls socket.invoke with correct arguments when 'Delete' button is clicked", () => {
        render(<MessageOptionCard 
            id={3} 
            onChange={vi.fn()} 
            onMessageToReply={vi.fn()} 
            onEdit={vi.fn()} 
            isEditAndDeleteVisible={true} 
        />);
    
        fireEvent.click(screen.getByText("Delete"));
    
        expect(socket.invoke).toHaveBeenCalledWith("DeleteMessage", "delete_message", {
            id: 3,
            content: "",
        });
    });
});
