import React, { useState } from 'react';

const GroupComponent = () => {
    const [groups, setGroups] = useState([{ from: 1, to: 10 }]);
    const [statuses, setStatuses] = useState({});
    const [showStatus, setShowStatus] = useState(false);

    const handleAddGroup = () => {
        const newGroup = { from: groups[groups.length - 1].to + 1, to: groups[groups.length - 1].to + 10 };
        setGroups([...groups, newGroup]);
    };

    const handleShowStatus = async () => {
        // API call to get completion status of each item
        const response = await fetch('https://jsonplaceholder.typicode.com/todos');
        const data = await response.json();
        setStatuses(data);
        setShowStatus(true);
    };

    const handleDeleteGroup = (index) => {
        if (groups.length === 1) {
            alert("Cannot delete the only group.");
            return;
        }
        setGroups(groups.filter((_, i) => i !== index));
    };

    const handleFromChange = (e, index) => {
        const newFromValue = parseInt(e.target.value);
        const updatedGroups = [...groups];
        updatedGroups[index].from = newFromValue;
        setGroups(updatedGroups);
        setShowStatus(false);
    };

    const handleToChange = (e, index) => {
        const newToValue = parseInt(e.target.value);
        const updatedGroups = [...groups];
        updatedGroups[index].to = newToValue;
        setGroups(updatedGroups);
        setShowStatus(false);
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ width: '80%' }}>
                {groups.map((group, index) => (
                    <div key={index} className='row'>
                        {index > 0 && (
                            <button onClick={() => handleDeleteGroup(index)}>Delete</button>
                        )}
                        <br />
                        <div className="input-group mb-3 col-6">
                            <span className="input-group-text">Group {index + 1}</span>
                            <input type="number" id={`from-${index}`} onChange={(e) => handleFromChange(e, index)} className="form-control" value={group.from} />
                            <span className="input-group-text">==</span>
                            <input type="number" id={`to-${index}`} onChange={(e) => handleToChange(e, index)} className="form-control" value={group.to} />
                        </div>
                        <div className='col-6'>
                            {showStatus && (
                                <>
                                    {statuses
                                        .filter((_, i) => i + 1 >= group.from && i + 1 <= group.to)
                                        .map((status, i) => (
                                            <span key={i}>
                                                {i + group.from}: {status.completed ? "True" : "False"}
                                            </span>
                                        ))}
                                </>
                            )}
                        </div>
                    </div>
                ))}
                <button onClick={handleAddGroup}>Add Group</button>
                <button onClick={handleShowStatus}>Show Status</button>
            </div>
        </div>
    );
};

export default GroupComponent;
