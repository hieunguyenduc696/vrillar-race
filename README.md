## Cài đặt dependencies

```bash
$ yarn install
```

## Chạy app

```bash
# watch mode
$ yarn run start:dev

```

## Nội dung và cách triển khai

```bash
Database sử dụng MongoDB, gồm 2 collections: Drivers (danh sách các outstanding drivers theo năm), Races (Danh sách races theo năm)
Tất cả APIS đều sử dụng MongoDB Aggregation Pipeline

Chương trình gồm 2 modules, drivers và races
Module races bao gồm các APIS:
- Create race
  + Mô tả: Tạo 1 race
  + Path: POST - http://localhost:3000/races
  + Kiểu trả về:
      {
        id: string
      }
  + Body:
      grandPrix: string
      year: Date
      driver: string
      team: string
      laps: number
      time: string
- Get all races
  + Mô tả: Trả về tất cả các races
  + Path: GET - http://localhost:3000/races
  + Kiểu trả về:
      {
        data: RacesEntity[]
        total: number
      }
  + Query Params:
      grandPrix: string
      driver: string
      team: string
      year: number
      page: number
      limit: number
- Update race by ID
  + Mô tả: Cập nhật thông tin của 1 race
  + Path: PATCH - http://localhost:3000/races/:raceId
  + Kiểu trả về: void
  + Params:
      raceId: string (example: 648edede44f2f0a6be612e57)
  + Query Params:
      grandPrix: string
      year: number
      driver: string
      team: string
      laps: number
      time: string
- Delete race by ID
  + Mô tả: Xóa 1 race
  + Path: DELETE - http://localhost:3000/races/:raceId
  + Kiểu trả về: void
  + Params:
      raceId: string (example: 648edede44f2f0a6be612e57)

Module drivers bao gồm API:
- Get driver yearly ranking
  + Mô tả: Trả về tất cả hạng của driver theo năm
  + Path: GET - http://localhost:3000/drivers/:driverName/ranking
  + Kiểu trả về:
      {
        year: number
        pos: string
      }
  + Query Params:
      driverName: string (example: Max Verstappen)
```
