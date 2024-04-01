import React, { } from 'react';
import { Tldraw } from 'tldraw';
import { Button, Menu } from '../index.js';

const Boards = ({ boardId }) => {
    return (
        <div className="fixed inset-0">
            <div className="relative h-full">
                <div className="absolute top-0 left-0 z-10">
                    <Menu />
                </div>
                <Tldraw className="relative z-0" persistenceKey={boardId} />
            </div>
        </div>
    )
}

export default Boards;