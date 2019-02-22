using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using Knjiznica.Model;
using Knjiznica.Forme;



namespace Knjiznica
{
    public partial class Knjiznica : Form
    {
        public PodatkovniKontekst Kontekst;
        public Knjiznica()
        {
            InitializeComponent();
        }

        private void Form1_Load(object sender, EventArgs e)
        {
            try
            {
                this.Kontekst = new PodatkovniKontekst();
            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.ToString());
            }

        }


        private void učeniciToolStripMenuItem_Click(object sender, EventArgs e)
        {

            Ucenici frmUcenici = new Ucenici(this.Kontekst);
            frmUcenici.ShowDialog();
        }



        private void PrikaziPosudbe()

        {
            Forme.Pomocna.PrikaziListuUListBoxu<Posudba>(
            this.Kontekst.Posudbe, lbPosudba);
        }

        private void knjigeToolStripMenuItem_Click(object sender, EventArgs e)
        {
            Knjige frmKnjige = new Knjige(this.Kontekst);
            frmKnjige.ShowDialog();


        }

        private void button1_Click(object sender, EventArgs e)
        {
            Detalji_posudbe frmPDetalji = new Detalji_posudbe(this.Kontekst);

            if (frmPDetalji.ShowDialog() == DialogResult.OK)
            {
                this.Kontekst.DodajPosudbu(frmPDetalji.P);
                PrikaziPosudbe();
            }




        }

        private void button2_Click(object sender, EventArgs e)
        {

            if (lbPosudba.SelectedIndex < 0)
            {
                MessageBox.Show("Niste odabrali posudbu!");
            }
            else
            {
                Detalji_posudbe frmPDetalji = new Detalji_posudbe(this.Kontekst);
                // Prikazujemo formu za detalje odabrane posudbe
                frmPDetalji.P = (Posudba)lbPosudba.SelectedItem;
                if (frmPDetalji.ShowDialog() == DialogResult.OK)
                {
                    // Spremamo promjene i osvježavamo listu
                    this.Kontekst.SpremiPosudbe();
                    PrikaziPosudbe();
                }
            }
        }

        private void button3_Click(object sender, EventArgs e)
        {
            if (lbPosudba.SelectedIndex < 0)
            {
                MessageBox.Show("Niste odabrali posudbu!");
            }
            else
            {
                // Uklanjamo posudbu s liste i osvježavamo listu
                this.Kontekst.BrisiPosudbu((Posudba)lbPosudba.
               SelectedItem);
                PrikaziPosudbe();
            }
        }

       
    }
    }
  

