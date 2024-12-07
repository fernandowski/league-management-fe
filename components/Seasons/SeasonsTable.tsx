import {View} from "react-native";
import {DataTable} from "react-native-paper";
import {useEffect, useState} from "react";
import {useData} from "@/hooks/useData";
import {useOrganizationStore} from "@/stores/organizationStore";

interface Season {
    id: string;
    name: string;
    league_id: string;
}

interface SeasonResponse {
    data: Season[];
    total: number;
}

interface SeasonTableIProps {
    leagueId: string;
    refresh: boolean;
}

const numberOfItemsPerPageList = [5, 10, 25];

export default function SeasonsTable(props: SeasonTableIProps) {
    const [page, setPage] = useState(0);
    const [seasons, setSeasons] = useState<Season[]>([]);
    const [total, setTotal] = useState(0);
    const [numberOfItemsPerPage, onItemsPerPageChange] = useState(
        numberOfItemsPerPageList[0]
    );
    const {organization} = useOrganizationStore();

    const {fetchData, fetching, error} = useData<SeasonResponse>();

    const from = page * numberOfItemsPerPage;
    const to = Math.min((page + 1) * numberOfItemsPerPage, total);
    const emptyRows = numberOfItemsPerPage - seasons.length;

    // Fetch seasons data
    useEffect(() => {
        const fetchSeasons = async () => {
            const offsetFilter = `offset=${encodeURIComponent(from)}`;
            const limitFilter = `limit=${encodeURIComponent(numberOfItemsPerPage)}`;
            const response = await fetchData(
                `/v1/leagues/${props.leagueId}/seasons?${[offsetFilter, limitFilter].join(
                    "&"
                )}`
            );
            if (response) {
                setSeasons(response.data);
                setTotal(response.total);
            }
        };
        fetchSeasons();
    }, [props.leagueId, page, numberOfItemsPerPage, props.refresh]);

    useEffect(() => {
        if (page !== 0) {
            setPage(0);
        }
    }, [numberOfItemsPerPage, organization]);

    return (
        <View style={{flex: 1}}>
            <DataTable>
                <DataTable.Header>
                    <DataTable.Title>Name</DataTable.Title>
                </DataTable.Header>
                {seasons.map((season: Season) => (
                    <DataTable.Row key={season.id}>
                        <DataTable.Cell>{season.name}</DataTable.Cell>
                    </DataTable.Row>
                ))}

                {emptyRows > 0 &&
                    Array.from({length: emptyRows}).map((_, index) => (
                        <DataTable.Row key={`empty-${index}`}>
                            <DataTable.Cell>{'\u00A0'}</DataTable.Cell>
                        </DataTable.Row>
                    ))}
                <DataTable.Pagination
                    page={page}
                    onPageChange={(page) => setPage(page)}
                    label={`${from + 1}-${to} of ${total}`}
                    numberOfPages={Math.ceil(total / numberOfItemsPerPage)}
                    numberOfItemsPerPageList={numberOfItemsPerPageList}
                    onItemsPerPageChange={onItemsPerPageChange}
                    selectPageDropdownLabel={"Rows per page"}
                />
            </DataTable>
        </View>
    );
}
