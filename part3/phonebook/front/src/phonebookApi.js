import axios from "axios"

const PERSON_ENDPOINT_URL = "/api/persons"

const addPersonRecord = async (record) => {
    const res = await axios.post(PERSON_ENDPOINT_URL, record)
    return res.data
}

const updatePersonRecord = async (record) => {
    const res = await axios.put(`${PERSON_ENDPOINT_URL}/${record.id}`, record)
    return res.data
}

const getPersonRecords = async () => {
    const res = await axios.get(PERSON_ENDPOINT_URL)
    return res.data
}

const deletePersonRecord = async (id) => {
    const res = await axios.delete(`${PERSON_ENDPOINT_URL}/${id}`)
    return res.data
}

const Phonebook = {
    addPersonRecord,
    getPersonRecords,
    deletePersonRecord,
    updatePersonRecord
}

export default Phonebook