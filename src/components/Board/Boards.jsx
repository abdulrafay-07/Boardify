import React, { } from 'react';
import { Tldraw } from 'tldraw';
import { Button, Menu } from '../index.js';

const Boards = ({ boardId, deleteBoard }) => {
    return (
        <div className="fixed inset-0">
            <div className="relative h-full">
                <div className="absolute top-0 left-0 z-10">
                    <Menu />
                </div>
                <Button className="absolute top-0 right-0 m-3 lg:m-6 z-10" onClick={deleteBoard}>
                    Delete
                </Button>
                <Tldraw className="relative z-0" persistenceKey={boardId} />
            </div>
        </div>
    )
}

export default Boards;