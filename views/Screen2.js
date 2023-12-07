import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, FlatList, Pressable, StyleSheet } from 'react-native';
import store from '../redux/store';
import { setUser, addJob, deleteJob, updateJob } from '../redux/action';
import { useDispatch } from 'react-redux';

const URL = 'https://650663f03a38daf4803e724d.mockapi.io/phamducnhan/Nhan';
const Screen2 = ({ route }) => {
    const [dataLocal, setDataLocal] = useState({});
    const [selectedJob, setSelectedJob] = useState(null);
    const [nameJob, setNameJob] = useState('');
    const [data, setData] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchData = async () => {
            dispatch(setUser(route.params.user));
            setDataLocal(route.params.user);
        };
        fetchData();
    }, [route.params.user]);
    useEffect(() => {
        setData(store.getState());
    }, [store.getState()]);

    const handleAdd = () => {
        dispatch(addJob(nameJob));
        console.log(nameJob)
        setNameJob('');
    };

    const handleDelete = (id) => {
        const updatedData = data.job.filter((item) => item.id !== id);
        setData(updatedData);
        dispatch(deleteJob(id));
    };
    const handleUpdate = () => {
        if (selectedJob) {
            store.dispatch(updateJob(selectedJob.id, nameJob));
            const updatedData = data.job.map((item) =>
                item.id === selectedJob.id ? { ...item, name: nameJob } : item
            );
            setData(updatedData);
            console.log(updatedData);
            setSelectedJob(null);
            setNameJob('');
        }
    };
    const handleSelect = (item) => {
        setSelectedJob(item);
        setNameJob(item.name);
    };
    const handleUpApi = async () => {
        try {
            const updatedUser = store.getState();
            const response = await fetch(`${URL}/${updatedUser.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedUser),
            });
            const data = await response.json();
            console.log(data);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            alert('Đồng bộ dữ liệu lên API thành công');
        }
        catch (error) {
            alert('Đồng bộ dữ liệu lên API thất bại');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.username}>{route.params.user.username}</Text>
            <TextInput
                style={styles.input}
                placeholder='Enter job..'
                value={nameJob}
                onChangeText={(text) => setNameJob(text)}
            />
            <Pressable style={styles.button} onPress={handleAdd}>
                <Text style={styles.buttonText}>Add</Text>
            </Pressable>
            <Pressable style={styles.button1} onPress={() => { handleUpdate() }}>
                <Text style={styles.buttonText}>Update</Text>
            </Pressable>
            <Text style={styles.listHeader}>LIST JOB</Text>
            <FlatList
                data={data.job}
                renderItem={({ item }) => (
                    <View style={styles.itemContainer}>
                        <Pressable onPress={() => handleSelect(item)}>
                            <Text style={styles.itemText}>{item.name}</Text>
                        </Pressable>
                        <Pressable style={styles.deleteButton} onPress={() => handleDelete(item.id)}>
                            <Text style={styles.deleteButtonText}>Delete</Text>
                        </Pressable>
                    </View>
                )}
                keyExtractor={(item) => item.id.toString()}
            />
            <Pressable style={styles.button} onPress={handleUpApi}>
                <Text style={styles.buttonText}>Up API</Text>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    username: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    input: {
        borderWidth: 1,
        borderRadius: 5,
        height: 40,
        marginBottom: 10,
        paddingLeft: 10,
    },
    button: {
        backgroundColor: '#3498db',
        borderRadius: 5,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button1: {
        backgroundColor: 'red',
        borderRadius: 5,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
    },
    listHeader: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 20,
    },
    itemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 10,
    },
    itemText: {
        fontSize: 16,
    },
    deleteButton: {
        backgroundColor: 'red',
        borderRadius: 5,
        padding: 8,
    },
    deleteButtonText: {
        color: '#fff',
    },
});

export default Screen2;
