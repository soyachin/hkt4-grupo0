import { useEffect, useState } from "react"
import { fetchGroups } from "../../api/dataService"
import 'devextreme/data/odata/store';
import DataGrid, { Column, MasterDetail } from 'devextreme-react/data-grid';
import {Col} from "devextreme-react/responsive-box";


export default function Group() {
  // Se declara un estado llamado 'groupsWithPersonCount' utilizando useState.
  const [groupsWithPersonCount, setGroupsWithPersonCount] = useState();

  // Utiliza useEffect para realizar la solicitud a la API cuando el componente se monta.
  useEffect(() => {
    fetchGroups()
        .then((response) => {
          // Extrae los datos de respuesta de la solicitud.
          const groupsData = response.data;

          // Registra los datos de grupos en la consola.
          console.log(groupsData);

          // Modifica el estado 'groupsWithPersonCount' transformando los datos de grupos.
          setGroupsWithPersonCount(groupsData.map(group => ({
            id: group.id,
            name: group.name,
            people: group.people,
            personCount: group.people.length
          })))
        })
        .catch((error) => {
          console.log(error);
        })
  }, []); // El [] como segundo argumento asegura que useEffect se ejecute solo una vez al montar el componente.

  return (
      <DataGrid
          // Establece la fuente de datos para el DataGrid como 'groupsWithPersonCount'.
          dataSource={groupsWithPersonCount}

          // Muestra bordes alrededor de las celdas de la tabla.
          showBorders={true}
      >
        {/* Define la primera columna con el campo 'id' y un ancho de 50 píxeles. */}
        <Column dataField="id" width={50} />

        {/* Define la segunda columna con el campo 'name'. */}
        <Column dataField="name" />

        {/* Define la tercera columna con el campo 'personCount' y un título personalizado 'Number of Persons'. */}
        <Column dataField="personCount" caption="Number of Persons" />
        <Column caption="People" calculateDisplayValue={peopleString} />
        <Column />
      </DataGrid>

  )
}

function peopleString(data) {
  if (data.people) {
    const peopleById = data.people.map(person => person.name).join(', ');
    return peopleById;
  } else {
    return 'No se encuentran personas en este grupo.';
  }
}