import React from 'react'
import Header from '../../components/Header';
import { TfiBarChart } from "react-icons/tfi";
import { Chart as ChartJS } from 'chart.js/auto';
import { Line, Bar } from 'react-chartjs-2';


function Dashboard() {
  const data = {
    labels: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai'],
    datasets: [
      {
        label: 'Interventions',
        data: [12, 19, 3, 5, 2],
        backgroundColor: '#eb8e02',
      },
    ],
  };

  const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top',
      labels: {
        color: '#333',
        font: {
          size: 14
        }
      }
    },
    title: {
      display: true,
      text: 'Évolution des interventions',
      color: '#222',
      font: {
        size: 18
      }
    }
  },
  scales: {
    x: {
      ticks: { color: '#444' },
      grid: { display: false }
    },
    y: {
      ticks: { color: '#444' },
      grid: { color: '#eee' }
    }
  }
};


  return (
    <>
      <Header />
      <div className='container'>

        <div className='container_header'>
          <div className='container_header_right'>
            <h1 className='container_title'>Dashboard</h1>
            <p className='container_subtitle'>Bienvenue sur votre tableau de bord</p>
          </div>
          <div className='container_header_left'>
            <div className="select_filter">
              <select >
                <option>Aujourd'hui</option>
                <option>Hier</option>
                <option>Les 7 derniers jours</option>
                <option>Les 30 derniers jours</option>
                <option>Ce mois-ci</option>
                <option>Le mois dernier</option>
              </select>
            </div>

          </div>
        </div>

        <div className="container_content">
        <div className="cards">
  <div className="card">
    <div className="card_header">
      <span className="card_icon"><TfiBarChart /></span>
      <h2 className="card_title">Total Interventions</h2>
    </div>
    <p className="card_value">53 Interventions</p>
    <p className="card_change en_attente">En attente</p>
  </div>

  <div className="card">
    <div className="card_header">
      <span className="card_icon"><TfiBarChart /></span>
      <h2 className="card_title">Interventions Réalisées</h2>
    </div>
    <p className="card_value">120 Interventions</p>
    <p className="card_change realisees">Réalisées</p>
  </div>

  <div className="card">
    <div className="card_header">
      <span className="card_icon"><TfiBarChart /></span>
      <h2 className="card_title">Demandes en cours</h2>
    </div>
    <p className="card_value">35 Demandes</p>
    <p className="card_change en_cours">En cours</p>
  </div>

  <div className="card">
    <div className="card_header">
      <span className="card_icon"><TfiBarChart /></span>
      <h2 className="card_title">Demandes traitées</h2>
    </div>
    <p className="card_value">80 Demandes</p>
    <p className="card_change traitees">Traitée</p>
  </div>
</div>


          <div className="table_chart">
            <div className="table_dashboard">
              <div className="table_header">
                <h2 className="table_title">Dernières interventions</h2>
                <div className="table_actions">
                  <button className="btn btn-primary">Voir tout</button>
                </div>
              </div>
              <div className="table_content">
                <table className="table_dashboard_content">
                  <thead className='table_dashboard_header'>
                    <tr>
                      <th>Date</th>
                      <th>Client</th>
                      <th>Technicien</th>
                      <th>Statut</th>
                    </tr>
                  </thead>
                  <tbody className='table_dashboard_body'>
                    <tr>
                      <td>01/01/2023</td>
                      <td>Client A</td>
                      <td>Technicien X</td>
                      <td>En attente</td>
                    </tr>
                    <tr>
                      <td>02/01/2023</td>
                      <td>Client B</td>
                      <td>Technicien Y</td>
                      <td>Terminé</td>
                    </tr> <tr>
                      <td>02/01/2023</td>
                      <td>Client B</td>
                      <td>Technicien Y</td>
                      <td>Terminé</td>
                    </tr> <tr>
                      <td>02/01/2023</td>
                      <td>Client B</td>
                      <td>Technicien Y</td>
                      <td>Terminé</td>
                    </tr> <tr>
                      <td>02/01/2023</td>
                      <td>Client B</td>
                      <td>Technicien Y</td>
                      <td>Terminé</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="chart_dashboard">
              <Bar data={data} options={options} />
            </div>
          </div>
        </div>

      </div>




    </>
  )
}

export default Dashboard
